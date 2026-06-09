import { Link, useParams } from "react-router-dom";
import { getLocalizedPost, getPostBySlug } from "../data/blogPosts";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n/I18nContext";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const pageRef = useScrollReveal();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="page-shell center-page">
        <h1>404</h1>
        <Link className="button" to="/blog">
          {t.blog.back}
        </Link>
      </main>
    );
  }

  const loc = getLocalizedPost(post, lang);

  return (
    <main className="page-shell blog-post" ref={pageRef}>
      <Link className="blog-back-link reveal" to="/blog">
        ← {t.blog.back}
      </Link>

      <article className="reveal">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <h1>{loc.title}</h1>
        <p className="blog-post-excerpt">{loc.excerpt}</p>

        <div className="blog-post-content">
          {loc.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
