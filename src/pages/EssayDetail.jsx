import { useParams, Link, Navigate } from "react-router-dom";
import { useEssays } from "../hooks/useStore";
import Footer from "../components/Footer";

export default function EssayDetail() {
  const { slug } = useParams();
  const { essays } = useEssays();
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) return <Navigate to="/essays" replace />;

  const idx  = essays.findIndex((e) => e.slug === slug);
  const prev = essays[idx + 1] || null;
  const next = essays[idx - 1] || null;

  return (
    <>
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        <Link to="/essays" className="text-sienna text-[0.7rem] tracking-widest uppercase hover:text-ink transition-colors inline-block mb-10">← Back to Essays</Link>
        <img src={essay.img} alt={essay.title} className="w-full mb-10 object-cover" style={{ height: "340px", filter: "grayscale(12%) contrast(1.04)" }} />
        <p className="section-label mb-3">Essay</p>
        <h1 className="font-serif font-normal leading-snug text-ink mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>{essay.title}</h1>
        <div className="rule" />
        <div className="article-body mt-8">
          {essay.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <p className="font-serif italic text-stone text-lg mt-10 border-t border-mist pt-6">— Henry Chijindu Okpoli</p>
        <div className="flex justify-between items-center mt-14 pt-8 border-t border-mist flex-wrap gap-4">
          {next ? (
            <Link to={`/essays/${next.slug}`} className="text-left group">
              <p className="section-label mb-1">← Newer</p>
              <p className="font-serif text-ink text-lg group-hover:text-sienna transition-colors line-clamp-1">{next.title}</p>
            </Link>
          ) : <div />}
          {prev && (
            <Link to={`/essays/${prev.slug}`} className="text-right group">
              <p className="section-label mb-1">Older →</p>
              <p className="font-serif text-ink text-lg group-hover:text-sienna transition-colors line-clamp-1">{prev.title}</p>
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
