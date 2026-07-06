import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
import { useI18n } from "./i18n/I18nContext";
import LiteLayout from "./layouts/LiteLayout";
import MainLayout from "./layouts/MainLayout";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LiteHomePage from "./pages/LiteHomePage";
import NotFoundPage from "./pages/NotFoundPage";

function DocumentMeta() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = t.meta.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [t]);

  return null;
}

export default function App() {
  return (
    <>
      <DocumentMeta />
      <Analytics />
      <Routes>
        <Route element={<LiteLayout />}>
          <Route path="/lite" element={<LiteHomePage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
