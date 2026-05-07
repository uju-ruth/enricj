import { useState } from "react";
import Footer from "../components/Footer";

const FORMSPREE_ID = "mnjwzyyv";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <div className="fade-up mb-14">
          <p className="section-label mb-3">Reach Out</p>
          <h2 className="font-serif font-light text-ink" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>
            Contact
          </h2>
          <div className="rule" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div className="fade-up delay-1">
            <blockquote className="pull-quote" style={{ fontSize: "1.6rem" }}>Let's talk.</blockquote>
            <p className="text-stone leading-relaxed my-6 text-sm">
              Whether you'd like to discuss ideas, collaborate on something, or simply connect —
              I'm always glad to hear from thoughtful people.
            </p>
            <p className="section-label mb-2">Email directly</p>
            <a href="mailto:okpolihenry@gmail.com"
              className="font-serif text-2xl text-ink border-b border-sienna pb-0.5 hover:text-sienna transition-colors">
              okpolihenry@gmail.com
            </a>
          </div>

          {/* Form */}
          <div className="fade-up delay-2">
            {status === "success" ? (
              <div className="border-t border-mist pt-10 text-center">
                <p className="font-serif text-3xl text-ink font-light">Message sent.</p>
                <p className="text-stone text-sm mt-3 leading-relaxed">
                  Thank you for reaching out. Henry will get back to you soon.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-outline mt-6">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="section-label block mb-2">Name</label>
                  <input id="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="Your name" required
                    className="w-full border border-ash bg-transparent px-4 py-3 text-ink placeholder-ash text-sm outline-none focus:border-ink transition-colors" />
                </div>

                <div>
                  <label htmlFor="email" className="section-label block mb-2">Email</label>
                  <input id="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" required
                    className="w-full border border-ash bg-transparent px-4 py-3 text-ink placeholder-ash text-sm outline-none focus:border-ink transition-colors" />
                </div>

                <div>
                  <label htmlFor="message" className="section-label block mb-2">Message</label>
                  <textarea id="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="What's on your mind?" required
                    className="w-full border border-ash bg-transparent px-4 py-3 text-ink placeholder-ash text-sm outline-none focus:border-ink transition-colors resize-none" />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs">
                    Something went wrong. Please email okpolihenry@gmail.com directly.
                  </p>
                )}

                <button type="submit" disabled={status === "sending"}
                  className="btn-fill w-full text-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
