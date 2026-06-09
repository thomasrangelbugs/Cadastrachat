import { useTheme } from "../hooks/useTheme";
import logoPng from "../assets/images/logo-contratachat.png";

const logoWebp = "/logo-contratachat.webp";
const logoDarkWebp = "/logo-contratachat-dark.webp";
const logoDarkPng = "/logo-contratachat-dark.png";

export default function BrandLogo({ variant = "header" }) {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <span className={`brand-logo-wrap brand-logo-wrap--${variant}`}>
        <picture>
          <source srcSet={logoDarkWebp} type="image/webp" />
          <img src={logoDarkPng} alt="ContrataChat" width={180} height={48} loading="eager" decoding="async" />
        </picture>
      </span>
    );
  }

  return (
    <span className={`brand-logo-wrap brand-logo-wrap--${variant}`}>
      <picture>
        <source srcSet={logoWebp} type="image/webp" />
        <img src={logoPng} alt="ContrataChat" width={180} height={48} loading="eager" decoding="async" />
      </picture>
    </span>
  );
}
