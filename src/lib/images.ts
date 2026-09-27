import fs from "node:fs";
import path from "node:path";

const EXTS = ["jpg", "jpeg", "png", "webp", "avif"];

// Returns "/<folder>/<name>.<ext>" if that photo exists in /public, else undefined.
// Server-only (reads the filesystem at build time).
export function publicImage(folder: string, name: string, exts = EXTS): string | undefined {
  for (const ext of exts) {
    const file = `${name}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", folder, file))) {
      return `/${folder}/${file}`;
    }
  }
  return undefined;
}

// Organization logos live in public/logos/<name>.png (or .svg/.jpg/.webp).
export const logoImage = (name: string) => publicImage("logos", name, [...EXTS, "svg"]);
