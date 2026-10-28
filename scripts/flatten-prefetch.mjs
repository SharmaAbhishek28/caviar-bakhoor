/**
 * scripts/flatten-prefetch.mjs
 *
 * Runs after `next build`. Next's static export writes each page's
 * prefetch data in a folder (about/__next.about/__PAGE__.txt), but the
 * browser asks for it as one dotted name (about/__next.about.__PAGE__.txt).
 * Vercel bridges the two with rewrites; a plain static host such as
 * Cloudflare Pages cannot, and every link prefetch 404s. This writes the
 * dotted copy beside each one.
 */
import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
const SKIP = new Set(["_next", "_img", "images", "video"]);
let n = 0;

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) await flatten(p, e.name, dir);
    else await walk(p);
  }
}

// Every file below a __next.<segment> folder, named by its path in dots.
async function flatten(dir, name, routeDir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await flatten(p, `${name}.${e.name}`, routeDir);
    else {
      await copyFile(p, path.join(routeDir, `${name}.${e.name}`));
      n++;
    }
  }
}

await walk(OUT);
console.log(`[prefetch] ${n} files flattened`);
