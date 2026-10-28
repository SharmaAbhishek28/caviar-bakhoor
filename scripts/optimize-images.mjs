/**
 * scripts/optimize-images.mjs
 *
 * Runs before `next dev` and `next build`. Resizes every photograph under
 * public/images (except _raw) to each width next/image can ask for
 * (image-sizes.json), as WebP, into public/_img. src/lib/image-loader.ts
 * points next/image at these files. Never enlarges: a width past the
 * original gets the original size. Files already up to date are skipped,
 * so only new or changed photographs cost time.
 */
import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "public", "_img");
const sizes = JSON.parse(await readFile(path.join(ROOT, "image-sizes.json"), "utf8"));
const WIDTHS = [...sizes.imageSizes, ...sizes.deviceSizes].sort((a, b) => a - b);
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === "_raw") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (IMAGE.test(e.name)) yield p;
  }
}

const mtime = (p) => stat(p).then((s) => s.mtimeMs, () => 0);
let made = 0, kept = 0;
const started = Date.now();

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(IMAGE, "");
  const srcTime = await mtime(file);
  const todo = [];
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${rel}-${w}.webp`);
    if ((await mtime(out)) > srcTime) kept++;
    else todo.push([w, out]);
  }
  if (!todo.length) continue;
  const input = await readFile(file);
  const { width: original = Infinity } = await sharp(input).metadata();
  await mkdir(path.dirname(todo[0][1]), { recursive: true });
  let full;
  for (const [w, out] of todo) {
    let buf;
    if (w >= original) buf = full ??= await sharp(input).rotate().webp({ quality: 80 }).toBuffer();
    else buf = await sharp(input).rotate().resize({ width: w }).webp({ quality: 80 }).toBuffer();
    await writeFile(out, buf);
    made++;
  }
}

console.log(`[images] ${made} written, ${kept} up to date (${((Date.now() - started) / 1000).toFixed(1)}s)`);
