/**
 * Convert a Jarbou3i_Model Strategic v1.1 analysis JSON into `--props` for
 * the Jarbou3iExplainer composition.
 *
 *   npx tsx scripts/json-to-props.ts <analysis.json> [--out out/props.json]
 *        [--headline "Raw claim text"] [--manifest public/tts/manifest.json]
 *   npx remotion render Jarbou3iExplainer out/case.mp4 --props=out/props.json
 *
 * Epistemic status per pillar is derived from the evidence the analysis
 * links to that pillar's first record (`links` with an evidence `from`):
 *   - strongest linked evidence has basis observation|source_based and
 *     evidence_strength >= 4                     -> VERIFIED_FACT
 *   - strength >= 3 (any basis)                 -> STRUCTURAL_INFERENCE
 *   - strength <= 2, or no linked evidence      -> UNVERIFIED_CLAIM
 * A record may override this with an explicit `epistemic_status` field.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  EpistemicStatusSchema,
  Jarbou3iVideoSchema,
  SCENE_ORDER,
  TtsManifestSchema,
  type EpistemicStatus,
  type Jarbou3iVideoProps,
  type Pillar,
} from "../src/types/jarbou3iSchema";

type AnyRecord = Record<string, unknown>;

const PILLARS: {
  id: Pillar["id"];
  label: string;
  jsonKey: string;
  question: string;
  plainSummary: string;
}[] = [
  { id: "actors", label: "Actors", jsonKey: "actors", question: "Who can act, block or decide?", plainSummary: "The people and institutions with the power to act, block or decide." },
  { id: "interests", label: "Interests", jsonKey: "interests", question: "What does each side want?", plainSummary: "What each side stands to gain or lose, stated or hidden." },
  { id: "tools", label: "Tools", jsonKey: "tools", question: "How do they make it happen?", plainSummary: "The laws, money, technology and pressure used to get results." },
  { id: "narratives", label: "Narratives", jsonKey: "narrative", question: "What story are we being told?", plainSummary: "The public story used to justify the action and win consent." },
  { id: "results", label: "Results", jsonKey: "results", question: "What actually happened?", plainSummary: "What really changed on the ground, for whom, at what cost." },
  { id: "feedback_loops", label: "Feedback Loops", jsonKey: "feedback", question: "How does the system adapt?", plainSummary: "How outcomes push the actors to adapt, and the cycle restarts." },
];

const MAX_SAMPLE_CHARS = 46;

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function fail(message: string): never {
  console.error(`json-to-props: ${message}`);
  process.exit(1);
}

const asArray = (v: unknown): AnyRecord[] => (Array.isArray(v) ? (v as AnyRecord[]) : []);
const str = (v: unknown) => String(v ?? "").trim();
const truncate = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

function deriveStatus(record: AnyRecord, analysis: AnyRecord): EpistemicStatus {
  const explicit = EpistemicStatusSchema.safeParse(record.epistemic_status);
  if (explicit.success) return explicit.data;

  const evidence = asArray((analysis.evidence as AnyRecord | undefined)?.items);
  const byId = new Map(evidence.map((e) => [str(e.id), e]));
  const linked = asArray(analysis.links)
    .filter((l) => str(l.to) === str(record.id) && byId.has(str(l.from)))
    .map((l) => byId.get(str(l.from))!);
  if (linked.length === 0) return "UNVERIFIED_CLAIM";

  const best = linked.reduce((a, b) => (Number(b.evidence_strength) > Number(a.evidence_strength) ? b : a));
  const strength = Number(best.evidence_strength) || 0;
  const direct = ["observation", "source_based"].includes(str(best.basis));
  if (direct && strength >= 4) return "VERIFIED_FACT";
  if (strength >= 3) return "STRUCTURAL_INFERENCE";
  return "UNVERIFIED_CLAIM";
}

function loadScenes(manifestPath: string): Jarbou3iVideoProps["scenes"] {
  if (existsSync(manifestPath)) {
    const manifest = TtsManifestSchema.parse(JSON.parse(readFileSync(manifestPath, "utf8")));
    return Object.fromEntries(
      SCENE_ORDER.map((id) => {
        const { audioFile, durationInFrames, captions } = manifest.scenes[id];
        return [id, { audioFile, durationInFrames, captions }];
      }),
    ) as Jarbou3iVideoProps["scenes"];
  }
  // calculateMetadata replaces these from public/tts/manifest.json at render time.
  const placeholder = (id: string) => ({ audioFile: `tts/scene-${id}.mp3`, durationInFrames: 300, captions: [] });
  return {
    hook: placeholder("hook"),
    pillars: placeholder("pillars"),
    demo: placeholder("demo"),
    quickstart: placeholder("quickstart"),
  };
}

function main() {
  const input = process.argv[2];
  if (!input || input.startsWith("--")) fail("usage: json-to-props.ts <analysis.json> [--out file] [--headline text]");

  const analysis = JSON.parse(readFileSync(resolve(input), "utf8")) as AnyRecord;
  const lens = str(analysis.analysis_lens || "strategic");
  if (lens !== "strategic") {
    fail(`analysis_lens "${lens}" is not supported; export a Strategic v1.1 analysis (six pillars).`);
  }
  if (str(analysis.schema_version) !== "1.1.0") {
    fail(`schema_version "${str(analysis.schema_version)}" is not the Strategic 1.1.0 contract.`);
  }

  const pillars: Pillar[] = PILLARS.map((p) => {
    const record = asArray(analysis[p.jsonKey])[0];
    if (!record) fail(`"${p.jsonKey}" has no records; every pillar needs at least one.`);
    return {
      ...p,
      recordId: str(record.id),
      sampleValue: truncate(str(record.name ?? record.description), MAX_SAMPLE_CHARS),
      status: deriveStatus(record, analysis),
    };
  });

  const subject = (analysis.subject ?? {}) as AnyRecord;
  const narrative = asArray(analysis.narrative)[0];
  const rhetoric = str(asArray((analysis.contradictions as AnyRecord | undefined)?.items)[0]?.rhetoric);
  const refPkg = resolve(".repo-ref/package.json");
  const version = arg("--version")
    ?? (existsSync(refPkg) ? `v${JSON.parse(readFileSync(refPkg, "utf8")).version}` : "Strategic v1.1");

  const props = Jarbou3iVideoSchema.parse({
    repoName: "hiimOmagh/Jarbou3i_Model",
    version,
    tagline: "Separate verified facts from structural inferences.",
    caseStudyTitle: str(subject.title),
    rawHeadline: arg("--headline") ?? [str(narrative?.name), rhetoric].filter(Boolean).join(" — "),
    pillars,
    scenes: loadScenes(resolve(arg("--manifest") ?? "public/tts/manifest.json")),
  });

  const out = arg("--out");
  const json = `${JSON.stringify(props, null, 2)}\n`;
  if (out) {
    mkdirSync(dirname(resolve(out)), { recursive: true });
    writeFileSync(resolve(out), json);
    console.error(`json-to-props: wrote ${out}`);
    for (const p of pillars) console.error(`  ${p.label.padEnd(15)} ${p.recordId.padEnd(4)} ${p.status.padEnd(21)} ${p.sampleValue}`);
  } else {
    process.stdout.write(json);
  }
}

main();
