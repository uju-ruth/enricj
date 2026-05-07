import { useState } from "react";

export default function PostForm({ initial = {}, onSave, onCancel, type = "essay", saving = false }) {
  const isEssay = type === "essay";
  const [form, setForm] = useState({
    title:    initial.title    || "",
    excerpt:  initial.excerpt  || "",
    img:      initial.img      || "",
    body:     Array.isArray(initial.body) ? initial.body.join("\n\n") : initial.body || "",
    journal:  initial.journal  || "",
    year:     initial.year     || "",
    authors:  initial.authors  || "",
    link:     initial.link     || "",
    abstract: initial.abstract || "",
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (isEssay && !form.body.trim()) e.body = "Body is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = isEssay
      ? {
          title:   form.title.trim(),
          excerpt: form.excerpt.trim(),
          img:     form.img.trim(),
          body:    form.body.trim().split(/\n\n+/).map(p => p.trim()).filter(Boolean),
        }
      : {
          title:    form.title.trim(),
          journal:  form.journal.trim(),
          year:     form.year.trim(),
          authors:  form.authors.trim(),
          link:     form.link.trim(),
          abstract: form.abstract.trim(),
        };
    onSave(payload);
  }

  const inputClass = "w-full border border-ash bg-transparent px-4 py-2.5 text-ink placeholder-ash text-sm outline-none focus:border-ink transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">

      {/* Title */}
      <div>
        <label className="section-label block mb-2">Title <span className="text-sienna">*</span></label>
        <input type="text" value={form.title} onChange={e => handleChange("title", e.target.value)}
          placeholder={isEssay ? "Essay title" : "Publication title"} className={inputClass} />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {isEssay ? (
        <>
          <div>
            <label className="section-label block mb-2">Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={e => handleChange("excerpt", e.target.value)}
              placeholder="Short summary shown on essays list (1–2 sentences)"
              className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="section-label block mb-2">Cover Image URL</label>
            <input type="url" value={form.img} onChange={e => handleChange("img", e.target.value)}
              placeholder="https://example.com/image.jpg" className={inputClass} />
            {form.img && (
              <img src={form.img} alt="preview" className="mt-2 w-full h-40 object-cover border border-mist"
                onError={e => e.target.style.display = "none"} />
            )}
          </div>

          <div>
            <label className="section-label block mb-2">Body <span className="text-sienna">*</span></label>
            <p className="text-stone text-xs mb-2">Separate paragraphs with a blank line.</p>
            <textarea rows={14} value={form.body} onChange={e => handleChange("body", e.target.value)}
              placeholder="Write the full essay here. Leave a blank line between paragraphs."
              className={`${inputClass} resize-y`} />
            {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="section-label block mb-2">Authors</label>
            <input type="text" value={form.authors} onChange={e => handleChange("authors", e.target.value)}
              placeholder="e.g. Henry Okpoli, J. Smith" className={inputClass} />
          </div>
          <div>
            <label className="section-label block mb-2">Journal / Publisher</label>
            <input type="text" value={form.journal} onChange={e => handleChange("journal", e.target.value)}
              placeholder="e.g. Nature, Science" className={inputClass} />
          </div>
          <div>
            <label className="section-label block mb-2">Year</label>
            <input type="text" value={form.year} onChange={e => handleChange("year", e.target.value)}
              placeholder="2025" className={`${inputClass} max-w-[120px]`} />
          </div>
          <div>
            <label className="section-label block mb-2">Link (DOI or URL)</label>
            <input type="url" value={form.link} onChange={e => handleChange("link", e.target.value)}
              placeholder="https://doi.org/..." className={inputClass} />
          </div>
          <div>
            <label className="section-label block mb-2">Abstract / Description</label>
            <textarea rows={5} value={form.abstract} onChange={e => handleChange("abstract", e.target.value)}
              placeholder="Brief description or abstract" className={`${inputClass} resize-y`} />
          </div>
        </>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="btn-fill disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? "Saving..." : `Save ${isEssay ? "Essay" : "Publication"}`}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} className="btn-outline disabled:opacity-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
