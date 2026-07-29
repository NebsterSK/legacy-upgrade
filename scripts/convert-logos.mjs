import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';

const SRC_DIR = 'src/assets/images/logos/src';
const OUT_DIR = 'src/assets/images/logos';
const SIZES = [64, 128, 256, 512];

// SRC_DIR is not committed — drop original logo files there before running.
// Note: nothing currently references the `-{64,128,256,512}w.avif` output; the
// page uses the plain svg/webp/png files. See plan.md "Open questions".
let files;
try {
    files = await readdir(SRC_DIR);
} catch {
    console.error(`No such directory: ${SRC_DIR}\nPut source logo files there first.`);
    process.exit(1);
}

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
