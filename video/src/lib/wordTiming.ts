import type { Caption } from "@remotion/captions";

const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9'-]/g, "");

/**
 * Frame (relative to the scene) at which `word` is first spoken, nudged a few
 * frames early so visuals land with the voice. Falls back when the word is
 * absent, e.g. with a custom narration.
 */
export const wordStartFrame = (
  captions: Caption[],
  word: string,
  fps: number,
  fallback: number,
  lead = 4,
): number => {
  const target = normalize(word);
  const hit = captions.find((c) => normalize(c.text) === target);
  return hit ? Math.max(0, Math.round((hit.startMs / 1000) * fps) - lead) : fallback;
};
