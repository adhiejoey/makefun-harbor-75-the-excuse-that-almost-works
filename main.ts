import { mkdirSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 140;
const MAX_WORDS = 20;

const SETUP = "Council cut the water to my block";
const CAUSE = "for emergency pipe repairs";
const STUCK = "I'm on bucket duty till noon";

function countWords(line: string): number {
  return line.split(/\s+/).filter((part) => part.length > 0).length;
}

function buildExcuse(): string {
  const raw = `${SETUP} ${CAUSE}, ${STUCK}`;
  return raw.replace(/\s+/g, " ").trim();
}

function main(): void {
  const line = buildExcuse();
  const words = countWords(line);
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry is ${line.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (words > MAX_WORDS) {
    throw new Error(`entry is ${words} words, must be at most ${MAX_WORDS}`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} chars (${words} words) to ${OUT_PATH}`);
  console.log(line);
}

main();
