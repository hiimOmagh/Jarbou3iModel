import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Inter and JetBrains Mono (SIL OFL) are self-hosted from public/fonts, the
// same latin variable files Google Fonts serves. Renders need no network
// access at all, which keeps them deterministic in CI and sandboxes where the
// headless browser cannot reach fonts.gstatic.com.
export const fontFamily = "Inter";
export const monoFamily = "JetBrains Mono";

loadFont({
  family: fontFamily,
  url: staticFile("fonts/Inter-latin-var.woff2"),
  weight: "100 900",
  format: "woff2",
});

loadFont({
  family: monoFamily,
  url: staticFile("fonts/JetBrainsMono-latin-var.woff2"),
  weight: "100 800",
  format: "woff2",
});
