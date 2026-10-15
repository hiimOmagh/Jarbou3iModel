import { z } from "zod";

// Presentation labels for the repo's epistemic discipline. They are derived
// from the Strategic contract's evidence `basis` + `evidence_strength` and the
// evidence -> record `links` (see scripts/json-to-props.ts), not stored in it.
export const EpistemicStatusSchema = z.enum([
  "VERIFIED_FACT",
  "STRUCTURAL_INFERENCE",
  "UNVERIFIED_CLAIM",
]);
export type EpistemicStatus = z.infer<typeof EpistemicStatusSchema>;

// Mirrors `Caption` from @remotion/captions.
export const CaptionSchema = z.object({
  text: z.string(),
  startMs: z.number(),
  endMs: z.number(),
  timestampMs: z.number().nullable(),
  confidence: z.number().nullable(),
  pageBreakAfter: z.boolean().optional(),
});

export const PillarSchema = z.object({
  id: z.enum(["actors", "interests", "tools", "narratives", "results", "feedback_loops"]),
  label: z.string(),
  question: z.string(),
  plainSummary: z.string(),
  // Real key in the Strategic v1.1 contract: interests, actors, tools, narrative, results, feedback.
  jsonKey: z.string(),
  recordId: z.string(),
  sampleValue: z.string(),
  status: EpistemicStatusSchema,
});
export type Pillar = z.infer<typeof PillarSchema>;

export const SceneIdSchema = z.enum(["hook", "pillars", "demo", "quickstart"]);
export type SceneId = z.infer<typeof SceneIdSchema>;

export const SceneSchema = z.object({
  audioFile: z.string(),
  durationInFrames: z.number().int().positive(),
  captions: z.array(CaptionSchema),
});
export type SceneData = z.infer<typeof SceneSchema>;

export const ScenesSchema = z.object({
  hook: SceneSchema,
  pillars: SceneSchema,
  demo: SceneSchema,
  quickstart: SceneSchema,
});

export const Jarbou3iVideoSchema = z.object({
  repoName: z.string(),
  version: z.string(),
  tagline: z.string(),
  caseStudyTitle: z.string(),
  rawHeadline: z.string(),
  pillars: z.array(PillarSchema).length(6),
  scenes: ScenesSchema,
});
export type Jarbou3iVideoProps = z.infer<typeof Jarbou3iVideoSchema>;

// Written by scripts/generate-tts.ts to public/tts/manifest.json.
export const TtsManifestSchema = z.object({
  fps: z.number(),
  generatedAt: z.string(),
  scenes: z.record(
    SceneIdSchema,
    SceneSchema.extend({
      source: z.enum(["elevenlabs", "fallback"]),
      audioEndSeconds: z.number(),
      durationInSeconds: z.number(),
    }),
  ),
});
export type TtsManifest = z.infer<typeof TtsManifestSchema>;

export const SCENE_ORDER: SceneId[] = ["hook", "pillars", "demo", "quickstart"];

export const STATUS_COLORS: Record<EpistemicStatus, string> = {
  VERIFIED_FACT: "#10B981",
  STRUCTURAL_INFERENCE: "#F59E0B",
  UNVERIFIED_CLAIM: "#F87171",
};
