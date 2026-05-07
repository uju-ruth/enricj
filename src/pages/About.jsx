import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <div className="fade-up mb-14">
          <p className="section-label mb-3">Who I Am</p>
          <h2 className="font-serif font-light text-ink" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>About Me</h2>
          <div className="rule" />
        </div>
        <div className="grid md:grid-cols-5 gap-16 items-start">
          <div className="md:col-span-2 fade-up delay-1">
            <div className="portrait-frame w-full max-w-xs">
              <img src="https://enricj.com/wp-content/uploads/2026/03/661854A2-BB78-4EE4-B665-095D7B89948E.jpg" alt="Henry Okpoli" className="w-full object-cover" style={{ filter: "grayscale(10%) contrast(1.05)" }} />
            </div>
            <div className="mt-8">
              <p className="section-label mb-2">Get in touch</p>
              <a href="mailto:okpolihenry@gmail.com" className="font-serif text-lg text-sienna hover:underline">okpolihenry@gmail.com</a>
            </div>
          </div>
          <div className="md:col-span-3 fade-up delay-2">
            <blockquote className="pull-quote">Why do some societies create stability and opportunity, while others struggle despite having resources and potential?</blockquote>
            <div className="article-body mt-6">
              <p>My name is Henry Okpoli. I am a scientist based in Belgium, working in the pharmaceutical industry. I am particularly interested in geopolitics, economic systems, institutions, and global power dynamics.</p>
              <p>Growing up in Nigeria and later living in Europe exposed me to very different systems of governance, culture, and opportunity. Experiencing these contrasts made me more observant and pushed me to think more deeply about how societies function.</p>
              <p>This website is a space where I try to make sense of these observations. I write about the forces that shape nations — power, incentives, history, culture, and institutions — and how they affect everyday life.</p>
              <p>I am not trying to present final answers. Instead, I am interested in exploring patterns, asking better questions, and understanding the deeper structures behind what we see on the surface.</p>
              <p>This site serves as a personal archive of my thinking, a place to develop ideas more clearly than what is possible in short social media posts.</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/essays"  className="btn-fill">Read Essays</Link>
              <Link to="/contact" className="btn-outline">Let's Talk</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
