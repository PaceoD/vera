import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/hero-sequence-png';
const outputDir = './public/hero-sequence-webp';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
console.log(`Found ${files.length} frames to process...`);

let completed = 0;
const total = files.length;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const inputPath = path.join(inputDir, file);
  const outputFileName = file.replace('.png', '.webp');
  const outputPath = path.join(outputDir, outputFileName);

  await sharp(inputPath)
    .webp({ quality: 85 })
    .toFile(outputPath);

  completed++;
  if (completed % 40 === 0 || completed === total) {
    console.log(`Processed ${completed}/${total} frames...`);
  }
}

console.log('Extracted frames optimization complete!');
