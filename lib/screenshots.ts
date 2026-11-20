import fs from "fs";
import path from "path";

export type Screenshot = {
  src: string;
  width: number;
  height: number;
};

function readImageSize(file: string): { width: number; height: number } {
  const buffer = fs.readFileSync(file);

  if (buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }

  throw new Error(`Unsupported image format: ${file}`);
}

export function getScreenshots(slug: string): Screenshot[] {
  const directory = path.join(process.cwd(), "public", "apps", slug);
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => /\.(png|jpe?g)$/i.test(file))
    .sort()
    .map((file) => ({
      src: `/apps/${slug}/${file}`,
      ...readImageSize(path.join(directory, file)),
    }));
}
