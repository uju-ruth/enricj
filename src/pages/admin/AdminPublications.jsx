import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePublications } from "../../hooks/useStore";
import PostForm from "../../components/PostForm";

// ── List ─────────────────────────────────────────────────────────────────────
export function AdminPublicationsList() {
  const { publications, loading, deletePublication } = usePublications();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function handleDelete(id) {
    if (confirmId === id) {
      setDeleting(id);
      await deletePublication(id);
      setDeleting(null);
      setConfirmId(null);
    } else {
      setConfirmId(id);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-label mb-1">Manage</p>
          <h1 className="font-serif text-4xl text-ink font-light">Publications</h1>
          <div className="rule" />
        </div>
        <button onClick={() => navigate("/admin/publications/new")} className="btn-fill mt-2">
          + New Publication
        </button>
      </div>

      {loading ? (
        <div className="border-t border-mist py-16 text-center">
          <p className="font-serif text-2xl text-stone italic font-light">Loading...</p>
        </div>
      ) : publications.length === 0 ? (
        <div className="border-t border-mist py-16 text-center">
          <p className="font-serif text-2xl text-stone italic font-light">No publications yet.</p>
          <button onClick={() => navigate("/admin/publications/new")} className="btn-outline mt-6">
            Add your first publication
          </button>
        </div>
      ) : (
        <div>
          {publications.map((p) => (
            <div key={p.id} className="border-t border-mist py-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xl text-ink leading-snug">{p.title}</p>
                <p className="text-stone text-xs mt-1">
                  {[p.authors, p.journal, p.year].filter(Boolean).join(" · ")}
                </p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    className="text-sienna text-xs hover:underline mt-0.5 inline-block truncate max-w-xs">
                    {p.link}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={() => navigate(`/admin/publications/edit/${p.id}`)}
                  className="text-sienna text-xs tracking-widest uppercase hover:text-ink transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className={`text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${
                    confirmId === p.id ? "text-red-500 font-medium" : "text-ash hover:text-red-400"
                  }`}
                >
                  {deleting === p.id ? "Deleting..." : confirmId === p.id ? "Confirm?" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── New ──────────────────────────────────────────────────────────────────────
export function AdminPublicationNew() {
  const { addPublication } = usePublications();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(payload) {
    setSaving(true);
    setError("");
    const { error } = await addPublication(payload);
    if (error) {
      setError("Failed to save. Please try again.");
      setSaving(false);
    } else {
      navigate("/admin/publications");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <p className="section-label mb-1">Create</p>
        <h1 className="font-serif text-4xl text-ink font-light">New Publication</h1>
        <div className="rule" />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <PostForm
        type="publication"
        saving={saving}
        onSave={handleSave}
        onCancel={() => navigate("/admin/publications")}
      />
    </div>
  );
}

// ── Edit ─────────────────────────────────────────────────────────────────────
export function AdminPublicationEdit() {
  const { id } = useParams();
  const { publications, updatePublication } = usePublications();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const pub = publications.find((p) => String(p.id) === id);

  if (!pub) return (
    <div className="max-w-2xl">
      <p className="text-stone">Publication not found.</p>
      <button onClick={() => navigate("/admin/publications")} className="btn-outline mt-4">Back</button>
    </div>
  );

  async function handleSave(payload) {
    setSaving(true);
    setError("");
    const { error } = await updatePublication(pub.id, payload);
    if (error) {
      setError("Failed to update. Please try again.");
      setSaving(false);
    } else {
      navigate("/admin/publications");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <p className="section-label mb-1">Edit</p>
        <h1 className="font-serif text-4xl text-ink font-light line-clamp-2">{pub.title}</h1>
        <div className="rule" />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <PostForm
        type="publication"
        initial={pub}
        saving={saving}
        onSave={handleSave}
        onCancel={() => navigate("/admin/publications")}
      />
    </div>
  );
}
