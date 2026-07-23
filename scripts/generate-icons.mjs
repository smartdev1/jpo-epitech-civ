import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const iconsDir = fileURLToPath(new URL('../public/icons/', import.meta.url))
const svg = readFileSync(new URL('../public/icons/source.svg', import.meta.url))

const targets = [
  { file: 'icon-192.png', size: 192, padding: 0 },
  { file: 'icon-512.png', size: 512, padding: 0 },
  { file: 'apple-touch-icon.png', size: 180, padding: 0 },
]

for (const { file, size } of targets) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(iconsDir + file)
  console.log('generated', file)
}

// Maskable icon needs safe-zone padding (content within ~80% center circle)
const maskSize = 512
const safe = Math.round(maskSize * 0.7)
const offset = Math.round((maskSize - safe) / 2)
const resizedContent = await sharp(svg, { density: 384 }).resize(safe, safe).png().toBuffer()

await sharp({
  create: {
    width: maskSize,
    height: maskSize,
    channels: 4,
    background: '#09090B',
  },
})
  .composite([{ input: resizedContent, left: offset, top: offset }])
  .png()
  .toFile(iconsDir + 'icon-maskable-512.png')
console.log('generated icon-maskable-512.png')
