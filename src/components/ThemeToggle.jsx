import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n/I18nContext";
import { IconMoon, IconSun } from "./icons";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
      title={theme === "dark" ? t.theme.light : t.theme.dark}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
