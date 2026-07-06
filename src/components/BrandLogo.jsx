import logoPng from "../assets/images/logo-contratachat.png";
import logoLightPng from "../assets/images/logo-contratachat-dark.png";

const logoWebp = "/logo-contratachat.webp";
const logoLightWebp = "/logo-contratachat-dark.webp";

export default function BrandLogo({ variant = "header" }) {
  const useLight = variant === "footer" || variant === "header" || variant === "lite";
  const png = useLight ? logoLightPng : logoPng;
  const webp = useLight ? logoLightWebp : logoWebp;

  return (
    <span className={`brand-logo-wrap brand-logo-wrap--${variant}`}>
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img src={png} alt="ContrataChat" width={180} height={48} loading="eager" decoding="async" />
      </picture>
    </span>
  );
}
