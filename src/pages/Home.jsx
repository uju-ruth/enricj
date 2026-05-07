import { Link } from "react-router-dom";
import { useEssays } from "../hooks/useStore";
import Footer from "../components/Footer";

export default function Home() {
  const { essays } = useEssays();
  const recent = essays.slice(0, 3);

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <section className="grid md:grid-cols-2 gap-16 items-center min-h-[82vh]">
          <div className="fade-up">
            <p className="section-label mb-6">Scientist &amp; Writer</p>
            <h1 className="font-serif font-light leading-[1.1] text-ink mb-5" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
              Henry<br /><em>Chijindu</em><br />Okpoli
            </h1>
            <div className="rule" />
            <p className="font-serif text-stone leading-relaxed mb-10 max-w-md" style={{ fontSize: "1.22rem" }}>
              I explore the invisible systems shaping how we live, from economics and technology to human behavior.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about"        className="btn-outline">About Me</Link>
              <Link to="/publications" className="btn-outline">Publications</Link>
              <Link to="/essays"       className="btn-outline">Essays</Link>
            </div>
          </div>
          <div className="fade-up delay-2 flex justify-center md:justify-end">
            <Link to="/about">
              <div className="portrait-frame w-72 md:w-80">
                <img src="https://enricj.com/wp-content/uploads/2026/03/IMG_4093.JPG-1017x1024.jpeg" alt="Henry Chijindu Okpoli" className="w-full object-cover" style={{ aspectRatio: "1/1", filter: "grayscale(15%) contrast(1.05)" }} />
              </div>
            </Link>
          </div>
        </section>

        <hr className="border-mist my-14" />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-up delay-3">
          {[
            { label: "Based in",  heading: "Belgium",  sub: "Pharmaceutical Industry" },
            { label: "Interests", heading: "Systems",  sub: "Geopolitics · Economics · Institutions" },
            { label: "Writing",   heading: "Essays",   sub: "Ideas developed beyond the feed" },
          ].map(({ label, heading, sub }) => (
            <div key={label}>
              <p className="section-label mb-2">{label}</p>
              <p className="font-serif text-2xl text-ink">{heading}</p>
              <p className="text-stone text-sm mt-1">{sub}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 fade-up delay-4">
          <div className="flex items-baseline justify-between mb-6">
            <p className="section-label">Recent Essays</p>
            <Link to="/essays" className="text-sienna text-[0.7rem] tracking-widest uppercase hover:text-ink transition-colors">View All →</Link>
          </div>
          {recent.map((e) => (
            <Link key={e.id} to={`/essays/${e.slug}`} className="block essay-card group">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="essay-title">{e.title}</h3>
                  <p className="essay-excerpt">{e.excerpt}</p>
                </div>
                <img src={e.img} alt={e.title} className="hidden md:block w-28 h-20 object-cover flex-shrink-0" style={{ filter: "grayscale(10%)" }} />
              </div>
              <p className="text-sienna text-[0.7rem] tracking-widest uppercase mt-3">Read Essay →</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
