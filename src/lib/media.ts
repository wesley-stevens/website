import fs from "node:fs";
import path from "node:path";

export type MediaSize = { width: number; height: number };

// Reads the pixel size of an image/video in /public at build time (server-only), so
// pages can size media explicitly instead of relying on each browser measuring it.
// Supports PNG, JPEG, and MP4/MOV. Returns undefined for anything else.
export function mediaSize(src: string): MediaSize | undefined {
  if (!src.startsWith("/")) return undefined;
  const file = path.join(process.cwd(), "public", decodeURIComponent(src.split(/[?#]/)[0]));
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return undefined;
  }
  return pngSize(buf) ?? jpegSize(buf) ?? mp4Size(buf);
}

function pngSize(b: Buffer): MediaSize | undefined {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return undefined;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

function jpegSize(b: Buffer): MediaSize | undefined {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return undefined;
  let i = 2;
  let orientation = 1;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker === 0xe1 && b.toString("latin1", i + 4, i + 10) === "Exif\0\0") {
      orientation = exifOrientation(b, i + 10) ?? orientation;
    }
    // SOF0-SOF15 (excluding DHT/JPG/DAC) hold the frame size.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      const width = b.readUInt16BE(i + 7);
      const height = b.readUInt16BE(i + 5);
      // Orientations 5-8 mean the photo displays rotated 90°, so swap.
      return orientation >= 5 ? { width: height, height: width } : { width, height };
    }
    i += 2 + len;
  }
  return undefined;
}

// Reads the EXIF Orientation tag (0x0112) from a TIFF block starting at `t`.
function exifOrientation(b: Buffer, t: number): number | undefined {
  const le = b.toString("latin1", t, t + 2) === "II";
  const u16 = (o: number) => (le ? b.readUInt16LE(o) : b.readUInt16BE(o));
  const u32 = (o: number) => (le ? b.readUInt32LE(o) : b.readUInt32BE(o));
  const ifd = t + u32(t + 4);
  const count = u16(ifd);
  for (let e = 0; e < count; e++) {
    const entry = ifd + 2 + e * 12;
    if (u16(entry) === 0x0112) return u16(entry + 8);
  }
  return undefined;
}

// Finds the video track's display size in an MP4/MOV (moov > trak > tkhd),
// swapping width/height when the track is rotated 90° or 270°.
function mp4Size(b: Buffer): MediaSize | undefined {
  const containers = new Set(["moov", "trak"]);
  const walk = (start: number, end: number): MediaSize | undefined => {
    let i = start;
    while (i + 8 <= end) {
      let size = b.readUInt32BE(i);
      const type = b.toString("latin1", i + 4, i + 8);
      let header = 8;
      if (size === 1) {
        size = Number(b.readBigUInt64BE(i + 8));
        header = 16;
      } else if (size === 0) {
        size = end - i;
      }
      if (size < header) return undefined;
      if (containers.has(type)) {
        const found = walk(i + header, i + size);
        if (found) return found;
      } else if (type === "tkhd") {
        const v = b[i + header];
        const body = i + header + 4 + (v === 1 ? 32 : 20) + 8 + 8; // up to the matrix
        const [a, bm] = [b.readInt32BE(body), b.readInt32BE(body + 4)];
        const width = b.readUInt32BE(body + 36) / 65536;
        const height = b.readUInt32BE(body + 40) / 65536;
        if (width > 0 && height > 0) {
          const rotated = a === 0 && bm !== 0;
          return rotated ? { width: height, height: width } : { width, height };
        }
      }
      i += size;
    }
    return undefined;
  };
  if (b.toString("latin1", 4, 8) !== "ftyp") return undefined;
  return walk(0, b.length);
}
