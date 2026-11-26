import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Sorry, the council's collecting my broken fridge today and they fine you if nobody's home to sign for it.";

// Fail loudly instead of shipping an entry the gate would refuse:
// 1-140 characters, at most 20 words, a single line of plain text.
if (
  entry.length < 1 ||
  entry.length > 140 ||
  entry.trim().split(/\s+/).length > 20 ||
  entry.includes("\n")
) {
  throw new Error("entry breaks the bounty gate (length, word count or lines)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
