import { z } from "zod";

// The ten epistemic types of the Biopolitical v2.1 evidence contract.
export const EpistemicTypeSchema = z.enum([
  "verified_fact",
  "quantitative_estimate",
  "institutional_claim",
  "scholarly_interpretation",
  "political_narrative",
  "legal_classification",
  "ethical_judgment",
  "plausible_inference",
  "speculation",
  "unsupported_allegation",
]);
export type EpistemicType = z.infer<typeof EpistemicTypeSchema>;

export const EPISTEMIC_COLORS: Record<EpistemicType, string> = {
  verified_fact: "#10B981",
  quantitative_estimate: "#38BDF8",
  institutional_claim: "#F87171",
  scholarly_interpretation: "#A78BFA",
  political_narrative: "#FB7185",
  legal_classification: "#60A5FA",
  ethical_judgment: "#C084FC",
  plausible_inference: "#F59E0B",
  speculation: "#FBBF24",
  unsupported_allegation: "#94A3B8",
};

// Mirrors `Caption` from @remotion/captions.
export const CaptionSchema = z.object({
  text: z.string(),
  startMs: z.number(),
  endMs: z.number(),
  timestampMs: z.number().nullable(),
  confidence: z.number().nullable(),
  pageBreakAfter: z.boolean().optional(),
});

export const ClaimSchema = z.object({
  type: EpistemicTypeSchema,
  text: z.string(),
  note: z.string(),
});
export type Claim = z.infer<typeof ClaimSchema>;

export const SceneIdSchema = z.enum(["hook", "workflow", "lenses", "evidence", "review", "workspace", "cta"]);
export type SceneId = z.infer<typeof SceneIdSchema>;
export const SCENE_ORDER: SceneId[] = ["hook", "workflow", "lenses", "evidence", "review", "workspace", "cta"];

export const SceneSchema = z.object({
  audioFile: z.string(),
  durationInFrames: z.number().int().positive(),
  captions: z.array(CaptionSchema),
});
export type SceneData = z.infer<typeof SceneSchema>;

export const ScenesSchema = z.record(SceneIdSchema, SceneSchema);

export const Jarbou3iVideoSchema = z.object({
  siteUrl: z.string(),
  tagline: z.string(),
  rawHeadline: z.string(),
  // Hook split: one claim per card, left to right.
  claims: z.array(ClaimSchema).length(3),
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
