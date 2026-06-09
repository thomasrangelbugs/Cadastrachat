import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollProgress from "./components/ScrollProgress";
import TechBackground from "./components/TechBackground";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { useI18n } from "./i18n/I18nContext";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
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
      <TechBackground />
      <ScrollProgress />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
