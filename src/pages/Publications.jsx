import { Link } from "react-router-dom";
import { usePublications } from "../hooks/useStore";
import Footer from "../components/Footer";

export default function Publications() {
  const { publications } = usePublications();
  return (
    <>
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <div className="fade-up mb-14">
          <p className="section-label mb-3">Academic &amp; Written Work</p>
          <h2 className="font-serif font-light text-ink" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>Publications</h2>
          <div className="rule" />
          <p className="text-stone text-sm max-w-lg leading-relaxed">Formal academic and research publications by Henry Okpoli.</p>
        </div>
        {publications.length === 0 ? (
          <div className="fade-up delay-1 border-t border-mist py-24 text-center">
            <p className="section-label mb-4">Coming Soon</p>
            <p className="font-serif text-3xl text-stone font-light italic">Publications are being compiled.</p>
            <p className="text-stone text-sm mt-4 max-w-sm mx-auto leading-relaxed">Academic papers, research articles, and formal writing will appear here. Reach out directly if you're interested in specific work.</p>
            <Link to="/contact" className="btn-outline inline-block mt-8">Get in Touch</Link>
          </div>
        ) : (
          <div className="fade-up delay-1">
            {publications.map((p) => (
              <div key={p.id} className="border-t border-mist py-7">
                <h3 className="font-serif text-2xl text-ink font-normal leading-snug">{p.title}</h3>
                {(p.authors || p.journal || p.year) && (
                  <p className="text-stone text-sm mt-2">{[p.authors, p.journal, p.year].filter(Boolean).join(" · ")}</p>
                )}
                {p.abstract && <p className="text-stone text-sm leading-relaxed mt-3 max-w-2xl">{p.abstract}</p>}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sienna text-xs tracking-widest uppercase hover:text-ink transition-colors">View Publication →</a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
