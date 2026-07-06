import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const logoPath = join(root, "src/assets/images/logo-contratachat.png");
const logoDarkPath = join(root, "src/assets/images/logo-contratachat-dark.png");
const webpOut = join(root, "public/logo-contratachat.webp");
const webpDarkOut = join(root, "public/logo-contratachat-dark.webp");
const pngDarkOut = join(root, "public/logo-contratachat-dark.png");
const ogOut = join(root, "public/og-image.webp");
const robotSourcePath = join(root, "src/assets/images/hero-robot-source.png");
const robotPngOut = join(root, "public/hero-robot.png");
const robotWebpOut = join(root, "public/hero-robot.webp");

async function removeBlackBackground(sharp, inputPath, threshold = 40) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < threshold && g < threshold && b < threshold) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, { raw: info });
}

/** Remove só o preto ligado às bordas — preserva visor/rosto preto do robô. */
async function removeEdgeBlackBackground(sharp, inputPath, threshold = 32) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  function isDark(idx) {
    const i = idx * 4;
    return data[i] < threshold && data[i + 1] < threshold && data[i + 2] < threshold;
  }

  function enqueue(idx) {
    if (idx < 0 || idx >= total || visited[idx] || !isDark(idx)) return;
    visited[idx] = 1;
    queue[tail++] = idx;
  }

  for (let x = 0; x < width; x++) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) enqueue(idx - 1);
    if (x < width - 1) enqueue(idx + 1);
    if (y > 0) enqueue(idx - width);
    if (y < height - 1) enqueue(idx + width);
  }

  for (let idx = 0; idx < total; idx++) {
    if (visited[idx]) data[idx * 4 + 3] = 0;
  }

  return sharp(data, { raw: info });
}

async function run() {
  try {
    const sharp = (await import("sharp")).default;

    if (existsSync(logoPath)) {
      await sharp(logoPath).webp({ quality: 82 }).toFile(webpOut);
      console.log("[optimize-images] WebP logo gerado:", webpOut);

      await sharp(logoPath)
        .resize(1200, 630, { fit: "contain", background: { r: 17, g: 27, b: 33, alpha: 1 } })
        .webp({ quality: 85 })
        .toFile(ogOut);
      console.log("[optimize-images] OG image WebP gerada:", ogOut);
    }

    if (existsSync(logoDarkPath)) {
      const transparent = await removeBlackBackground(sharp, logoDarkPath);
      await transparent.clone().webp({ quality: 88 }).toFile(webpDarkOut);
      await transparent.clone().png().toFile(pngDarkOut);
      console.log("[optimize-images] Logo escuro com fundo transparente:", webpDarkOut);
    }

    if (existsSync(robotSourcePath)) {
      const transparentRobot = await removeEdgeBlackBackground(sharp, robotSourcePath, 32);
      await transparentRobot.clone().png({ compressionLevel: 9 }).toFile(robotPngOut);
      await transparentRobot.clone().webp({ quality: 92 }).toFile(robotWebpOut);
      console.log("[optimize-images] Robô com fundo transparente (bordas):", robotWebpOut);
    }
  } catch (err) {
    console.warn("[optimize-images] sharp não disponível:", err.message);
  }
}

run();
