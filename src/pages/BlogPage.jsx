import { Link } from "react-router-dom";
import { blogPosts, getLocalizedPost } from "../data/blogPosts";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n/I18nContext";

export default function BlogPage() {
  const { t, lang } = useI18n();
  const pageRef = useScrollReveal();

  return (
    <main className="page-shell" ref={pageRef}>
      <div className="blog-header reveal">
        <span className="eyebrow">Blog</span>
        <h1>{t.blog.title}</h1>
        <p>{t.blog.subtitle}</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, i) => {
          const loc = getLocalizedPost(post, lang);
          return (
            <article className={`blog-card reveal reveal-delay-${(i % 3) + 1}`} key={post.slug}>
              <div className={`blog-cover blog-cover-${post.cover}`} aria-hidden="true" />
              <div className="blog-card-body">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="blog-read-time">{post.readTime} min</span>
                <h2>{loc.title}</h2>
                <p>{loc.excerpt}</p>
                <Link className="blog-link" to={`/blog/${post.slug}`}>
                  {t.blog.readMore} →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
