import "dotenv/config";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Caption } from "@remotion/captions";
import { SCENE_ORDER, type SceneId, type TtsManifest } from "../src/types/jarbou3iSchema";

// Usage: npx tsx scripts/generate-tts.ts
// Reads ELEVENLABS_API_KEY (and optional ELEVENLABS_VOICE_ID) from .env.
// The key never leaves this Node process: it is not written to any file,
// prop or log. Remotion only ever sees the MP3s and manifest.json.

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "nPczCjzI2devNBz1zQrb";
const FPS = 30;
const BREATHING_BUFFER_SECONDS = 0.6;
const OUT_DIR = join("public", "tts");

// Spoken and displayed forms are both 8 characters, so swapping one for the
// other inside a word token never shifts any timestamp.
const SPOKEN_NAME = "Jarbou'i";
const DISPLAY_NAME = "Jarbou3i";
const SPOKEN_NAME_PATTERN = /Jarbou['’]i/g;

const NARRATION: Record<SceneId, string> = {
  hook: "Every major policy or crisis arrives wrapped in a narrative. The Jarbou'i Model separates verified empirical facts from structural inferences, mapping how power actually operates.",
  pillars: "Instead of reading events as isolated headlines, the framework deconstructs systems across six interlocking pillars: Actors, Interests, Tools, Narratives, Results, and Feedback Loops.",
  demo: "Watch how a raw institutional claim is parsed in real time. On the left, plain-language questions unpack the system. On the right, every claim is gated by its epistemic status inside validated JSON.",
  quickstart: "Clone hiimOmagh slash Jarbou'i Model on GitHub to audit complex systems, stress-test competing hypotheses, and eliminate rhetorical inflation.",
};

type Alignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

type SceneAudio = {
  audio: Buffer;
  extension: "mp3" | "wav";
  alignment: Alignment;
  source: "elevenlabs" | "fallback";
};

if (DISPLAY_NAME.length !== SPOKEN_NAME.length) {
  throw new Error("Phonetic swap must preserve character count.");
}

async function synthesize(text: string): Promise<SceneAudio> {
  if (!API_KEY) throw new Error("ELEVENLABS_API_KEY is not set");
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`,
    {
      method: "POST",
      headers: { "xi-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.55, similarity_boost: 0.75 },
      }),
      signal: AbortSignal.timeout(60_000),
    },
  );
  if (!response.ok) {
    // Body is safe to print: ElevenLabs error payloads never echo the key.
    throw new Error(`ElevenLabs HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
  }
  const body = (await response.json()) as { audio_base64: string; alignment: Alignment | null };
  if (!body.audio_base64 || !body.alignment?.characters?.length) {
    throw new Error("ElevenLabs response is missing audio or alignment");
  }
  return {
    audio: Buffer.from(body.audio_base64, "base64"),
    extension: "mp3",
    alignment: body.alignment,
    source: "elevenlabs",
  };
}

// Deterministic offline stand-in: synthetic per-character timings at a
// natural narration pace, plus a silent 16-bit mono WAV of matching length.
function fallback(text: string): SceneAudio {
  const characters = [...text];
  const starts: number[] = [];
  const ends: number[] = [];
  let t = 0.15;
  for (const ch of characters) {
    const d = /[.!?]/.test(ch) ? 0.42 : /[,:;]/.test(ch) ? 0.24 : 1 / 15;
    starts.push(Number(t.toFixed(3)));
    t += d;
    ends.push(Number(t.toFixed(3)));
  }
  const sampleRate = 22050;
  const samples = Math.ceil((t + 0.2) * sampleRate);
  const wav = Buffer.alloc(44 + samples * 2);
  wav.write("RIFF", 0);
  wav.writeUInt32LE(36 + samples * 2, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(samples * 2, 40);
  return {
    audio: wav,
    extension: "wav",
    alignment: { characters, character_start_times_seconds: starts, character_end_times_seconds: ends },
    source: "fallback",
  };
}

function alignmentToCaptions(alignment: Alignment): Caption[] {
  const { characters, character_start_times_seconds: starts, character_end_times_seconds: ends } = alignment;
  const words: { text: string; start: number; end: number }[] = [];
  let current: { text: string; start: number; end: number } | null = null;

  characters.forEach((ch, i) => {
    if (/^\s+$/.test(ch)) {
      if (current) words.push(current);
      current = null;
      return;
    }
    if (!current) current = { text: "", start: starts[i], end: ends[i] };
    current.text += ch;
    current.end = ends[i];
  });
  if (current) words.push(current);

  return words.map((word, index) => {
    const display = word.text.replace(SPOKEN_NAME_PATTERN, DISPLAY_NAME);
    const startMs = Math.round(word.start * 1000);
    const endMs = Math.max(startMs + 1, Math.round(word.end * 1000));
    return {
      // createTikTokStyleCaptions() is whitespace-sensitive: every token after
      // the first carries its own leading space.
      text: index === 0 ? display : ` ${display}`,
      startMs,
      endMs,
      timestampMs: startMs,
      confidence: 1,
    };
  });
}

function probeDurationSeconds(file: string): number {
  try {
    const out = execFileSync(
      "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file],
      { encoding: "utf8" },
    );
    return Number.parseFloat(out) || 0;
  } catch {
    return 0;
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const scenes = {} as TtsManifest["scenes"];

  for (const id of SCENE_ORDER) {
    let result: SceneAudio;
    try {
      result = await synthesize(NARRATION[id]);
    } catch (error) {
      console.warn(`[tts] ${id}: ElevenLabs unavailable (${(error as Error).message}); using deterministic fallback.`);
      result = fallback(NARRATION[id]);
    }

    for (const ext of ["mp3", "wav"]) rmSync(join(OUT_DIR, `scene-${id}.${ext}`), { force: true });
    const fileName = `scene-${id}.${result.extension}`;
    const filePath = join(OUT_DIR, fileName);
    writeFileSync(filePath, result.audio);

    const lastCharEnd = Math.max(...result.alignment.character_end_times_seconds);
    const audioEndSeconds = Math.max(lastCharEnd, probeDurationSeconds(filePath));
    const durationInSeconds = audioEndSeconds + BREATHING_BUFFER_SECONDS;
    const captions = alignmentToCaptions(result.alignment);

    scenes[id] = {
      audioFile: `tts/${fileName}`,
      source: result.source,
      audioEndSeconds: Number(audioEndSeconds.toFixed(3)),
      durationInSeconds: Number(durationInSeconds.toFixed(3)),
      durationInFrames: Math.ceil(durationInSeconds * FPS),
      captions,
    };
    console.log(
      `[tts] ${id.padEnd(10)} ${result.source.padEnd(10)} ${durationInSeconds.toFixed(2)}s  ` +
        `${scenes[id].durationInFrames} frames  ${captions.length} words`,
    );
  }

  const manifest: TtsManifest = { fps: FPS, generatedAt: new Date().toISOString(), scenes };
  writeFileSync(join(OUT_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  const total = SCENE_ORDER.reduce((sum, id) => sum + scenes[id].durationInFrames, 0);
  console.log(`[tts] wrote ${join(OUT_DIR, "manifest.json")} — total ${total} frames (${(total / FPS).toFixed(2)}s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
