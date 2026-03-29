import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';

const SRC_DIR = 'source/_assets/images/logos/src';
const OUT_DIR = 'source/_assets/images/logos';
const SIZES = [64, 128, 256, 512];

const files = await readdir(SRC_DIR);

for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.svg', '.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    const name = path.parse(file).name;
    const input = path.join(SRC_DIR, file);

    for (const width of SIZES) {
        const output = path.join(OUT_DIR, `${name}-${width}w.avif`);
        await sharp(input, { density: 300 })
            .resize(width, width, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .avif({ quality: 80 })
            .toFile(output);

        console.log(`Created ${output}`);
    }
}

console.log('Done!');
