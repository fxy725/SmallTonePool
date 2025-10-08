import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '..', 'public', 'assets');

// Inputs
const inputs = [
  { in: 'Logo-512.png', out: 'Logo-512-padded.png', size: 512 },
  { in: 'Logo-192.png', out: 'Logo-192-padded.png', size: 192 },
  { in: 'Logo-dark-512.png', out: 'Logo-dark-512-padded.png', size: 512 },
  { in: 'Logo-dark-192.png', out: 'Logo-dark-192-padded.png', size: 192 },
];

// How much to scale the original logo inside the canvas.
// 0.6 means 60% of canvas size, leaving 20% transparent padding around.
const SCALE = 0.6;

async function padOne({ in: inputName, out: outputName, size }) {
  const inputPath = path.join(publicDir, inputName);
  const outputPath = path.join(publicDir, outputName);

  const canvasSize = size;
  const targetSize = Math.round(size * SCALE);
  const left = Math.round((canvasSize - targetSize) / 2);
  const top = Math.round((canvasSize - targetSize) / 2);

  const src = sharp(inputPath).resize({ width: targetSize, height: targetSize, fit: 'contain' });

  const compositeBuffer = await src.png().toBuffer();

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent padding
    },
  })
    .png()
    .composite([{ input: compositeBuffer, left, top }])
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  try {
    await fs.access(publicDir);
  } catch {
    throw new Error(`Assets dir not found: ${publicDir}`);
  }

  for (const item of inputs) {
    const out = await padOne(item);
    console.log('Generated', out);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

