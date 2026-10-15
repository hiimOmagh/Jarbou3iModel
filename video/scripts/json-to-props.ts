/**
 * Turn a Jarbou3i Model analysis export (Strategic v1.1 or Biopolitical v2.1
 * JSON) into `--props` for the Jarbou3iExplainer composition. The hook's three
 * cards show one verified fact, one institutional claim and one plausible
 * inference taken from the analysis's own evidence.
 *
 *   npx tsx scripts/json-to-props.ts <analysis.json> [--out out/props.json] [--headline "Raw claim"]
 *   npx remotion render Jarbou3iExplainer out/case.mp4 --props=out/props.json
 *
 * Biopolitical evidence carries `epistemic_type` directly. Strategic evidence
 * is mapped conservatively from `basis` + `evidence_strength`:
 *   observation|source_based and strength >= 4 -> verified_fact
 *   inference|estimate and strength >= 3       -> plausible_inference
 *   strength <= 2                              -> institutional_claim (asserted, unsupported)
 * Card text prefers the name of the record the evidence `links` to.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  Jarbou3iVideoSchema,
  SCENE_ORDER,
  TtsManifestSchema,
  type Claim,
  type EpistemicType,
  type Jarbou3iVideoProps,
} from "../src/types/jarbou3iSchema";

type AnyRecord = Record<string, unknown>;

const WANTED: EpistemicType[] = ["verified_fact", "institutional_claim", "plausible_inference"];
const NOTES: Record<EpistemicType, string> = {
  verified_fact: "Traceable to a verified source",
  quantitative_estimate: "A measured or modelled number",
  institutional_claim: "Asserted by an institution, not shown",
  scholarly_interpretation: "An expert reading, not a fact",
  political_narrative: "A framing, not evidence",
  legal_classification: "What the law calls it",
  ethical_judgment: "A value judgment",
  plausible_inference: "Inferred from structure, never stated",
  speculation: "Possible, not supported",
  unsupported_allegation: "Alleged without support",
};
const MAX_CHARS = 44;

const arg = (flag: string) => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const asArray = (v: unknown): AnyRecord[] => (Array.isArray(v) ? (v as AnyRecord[]) : []);
const str = (v: unknown) => String(v ?? "").trim();
const truncate = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);
const fail = (m: string): never => {
  console.error(`json-to-props: ${m}`);
  process.exit(1);
};

function strategicType(e: AnyRecord): EpistemicType | null {
  const strength = Number(e.evidence_strength) || 0;
  const basis = str(e.basis);
  if (["observation", "source_based"].includes(basis) && strength >= 4) return "verified_fact";
  if (["inference", "estimate"].includes(basis) && strength >= 3) return "plausible_inference";
  if (strength <= 2) return "institutional_claim";
  return null;
}

function main() {
  const input = process.argv[2];
  if (!input || input.startsWith("--")) fail("usage: json-to-props.ts <analysis.json> [--out file] [--headline text]");
  const analysis = JSON.parse(readFileSync(resolve(input), "utf8")) as AnyRecord;
  const lens = str(analysis.analysis_lens || "strategic");
  if (!["strategic", "biopolitical"].includes(lens)) fail(`unknown analysis_lens "${lens}"`);

  const evidence = asArray((analysis.evidence as AnyRecord | undefined)?.items ?? analysis.evidence);
  // Name of any record that an evidence item `links` to (Strategic), for short card text.
  const names = new Map<string, string>();
  for (const key of ["interests", "actors", "tools", "narrative", "results", "feedback"]) {
    for (const r of asArray(analysis[key])) names.set(str(r.id), str(r.name ?? r.description));
  }
  const linkedName = (id: string) => {
    const link = asArray(analysis.links).find((l) => str(l.from) === id && names.has(str(l.to)));
    return link ? names.get(str(link.to)) : undefined;
  };

  const typeOf = (e: AnyRecord) =>
    lens === "biopolitical" ? (str(e.epistemic_type) as EpistemicType) : strategicType(e);
  // Exact type matches first; empty slots then take the next unused non-fact item
  // under its real type. Fewer than three usable items is an error, not a guess.
  const used = new Set<AnyRecord>();
  const picks = WANTED.map((wanted) => {
    const hit = evidence.find((e) => !used.has(e) && typeOf(e) === wanted);
    if (hit) used.add(hit);
    return hit;
  });
  const claims: Claim[] = picks.map((hit, slot) => {
    const pick = hit ?? evidence.find((e) => !used.has(e) && typeOf(e) && typeOf(e) !== "verified_fact");
    if (!pick) return fail(`the hook needs three typed evidence items; no item fits slot ${slot + 1} (${WANTED[slot]}).`);
    used.add(pick);
    const type = typeOf(pick)!;
    return { type, note: NOTES[type], text: truncate(linkedName(str(pick.id)) ?? str(pick.claim), MAX_CHARS) };
  });

  const subject = (analysis.subject ?? {}) as AnyRecord;
  const manifestPath = resolve("public/tts/manifest.json");
  const manifest = existsSync(manifestPath) ? TtsManifestSchema.parse(JSON.parse(readFileSync(manifestPath, "utf8"))) : null;
  const scenes = Object.fromEntries(
    SCENE_ORDER.map((id) => {
      const s = manifest?.scenes[id];
      return [id, s ? { audioFile: s.audioFile, durationInFrames: s.durationInFrames, captions: s.captions } : { audioFile: `tts/scene-${id}.mp3`, durationInFrames: 300, captions: [] }];
    }),
  ) as Jarbou3iVideoProps["scenes"];

  const props = Jarbou3iVideoSchema.parse({
    siteUrl: "jarbou3i-model.pages.dev",
    tagline: "Evidence-disciplined analysis with the AI assistant you already use.",
    rawHeadline: arg("--headline") ?? str(subject.question ?? subject.title),
    claims,
    scenes,
  });

  const out = arg("--out");
  const json = `${JSON.stringify(props, null, 2)}\n`;
  if (!out) return void process.stdout.write(json);
  mkdirSync(dirname(resolve(out)), { recursive: true });
  writeFileSync(resolve(out), json);
  console.error(`json-to-props: wrote ${out}`);
  for (const c of claims) console.error(`  ${c.type.padEnd(20)} ${c.text}`);
}

main();
