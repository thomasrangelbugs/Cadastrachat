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

async function removeBlackBackground(sharp, inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 40 && g < 40 && b < 40) {
      data[i + 3] = 0;
    }
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
  } catch (err) {
    console.warn("[optimize-images] sharp não disponível:", err.message);
  }
}

run();
