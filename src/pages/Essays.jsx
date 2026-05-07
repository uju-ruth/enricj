import { Link } from "react-router-dom";
import { useEssays } from "../hooks/useStore";
import Footer from "../components/Footer";

export default function Essays() {
  const { essays } = useEssays();
  return (
    <>
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <div className="fade-up mb-14">
          <p className="section-label mb-3">Long-form Thinking</p>
          <h2 className="font-serif font-light text-ink" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>Essays</h2>
          <div className="rule" />
          <p className="text-stone text-sm max-w-lg leading-relaxed">Ideas developed beyond the feed. An archive of observations on systems, power, and how the world works.</p>
        </div>
        <div className="fade-up delay-1">
          {essays.map((e) => (
            <Link key={e.id} to={`/essays/${e.slug}`} className="block essay-card group">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="essay-title">{e.title}</h3>
                  <p className="essay-excerpt">{e.excerpt}</p>
                  <p className="text-sienna text-[0.7rem] tracking-widest uppercase mt-3">Read Essay →</p>
                </div>
                <img src={e.img} alt={e.title} className="hidden md:block w-32 object-cover flex-shrink-0" style={{ height: "88px", filter: "grayscale(10%)" }} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
