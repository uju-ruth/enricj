import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEssays } from "../../hooks/useStore";
import PostForm from "../../components/PostForm";

// ── List ─────────────────────────────────────────────────────────────────────
export function AdminEssaysList() {
  const { essays, loading, deleteEssay } = useEssays();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function handleDelete(id) {
    if (confirmId === id) {
      setDeleting(id);
      await deleteEssay(id);
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
          <h1 className="font-serif text-4xl text-ink font-light">Essays</h1>
          <div className="rule" />
        </div>
        <button onClick={() => navigate("/admin/essays/new")} className="btn-fill mt-2">
          + New Essay
        </button>
      </div>

      {loading ? (
        <div className="border-t border-mist py-16 text-center">
          <p className="font-serif text-2xl text-stone italic font-light">Loading essays...</p>
        </div>
      ) : essays.length === 0 ? (
        <div className="border-t border-mist py-16 text-center">
          <p className="font-serif text-2xl text-stone italic font-light">No essays yet.</p>
          <button onClick={() => navigate("/admin/essays/new")} className="btn-outline mt-6">
            Write your first essay
          </button>
        </div>
      ) : (
        <div>
          {essays.map((e) => (
            <div key={e.id} className="border-t border-mist py-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xl text-ink leading-snug">{e.title}</p>
                <p className="text-stone text-xs mt-1 truncate">{e.excerpt}</p>
                <p className="text-ash text-xs mt-1">/essays/{e.slug}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <a href={`/essays/${e.slug}`} target="_blank" rel="noreferrer"
                  className="text-stone text-xs tracking-widest uppercase hover:text-ink transition-colors">
                  View
                </a>
                <button onClick={() => navigate(`/admin/essays/edit/${e.id}`)}
                  className="text-sienna text-xs tracking-widest uppercase hover:text-ink transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  disabled={deleting === e.id}
                  className={`text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${
                    confirmId === e.id ? "text-red-500 font-medium" : "text-ash hover:text-red-400"
                  }`}
                >
                  {deleting === e.id ? "Deleting..." : confirmId === e.id ? "Confirm?" : "Delete"}
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
export function AdminEssayNew() {
  const { addEssay } = useEssays();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(payload) {
    setSaving(true);
    setError("");
    const { error } = await addEssay(payload);
    if (error) {
      setError("Failed to save. Please try again.");
      setSaving(false);
    } else {
      navigate("/admin/essays");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <p className="section-label mb-1">Create</p>
        <h1 className="font-serif text-4xl text-ink font-light">New Essay</h1>
        <div className="rule" />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <PostForm
        type="essay"
        saving={saving}
        onSave={handleSave}
        onCancel={() => navigate("/admin/essays")}
      />
    </div>
  );
}

// ── Edit ─────────────────────────────────────────────────────────────────────
export function AdminEssayEdit() {
  const { id } = useParams();
  const { essays, updateEssay } = useEssays();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const essay = essays.find((e) => String(e.id) === id);

  if (!essay) return (
    <div className="max-w-2xl">
      <p className="text-stone">Essay not found.</p>
      <button onClick={() => navigate("/admin/essays")} className="btn-outline mt-4">Back</button>
    </div>
  );

  async function handleSave(payload) {
    setSaving(true);
    setError("");
    const { error } = await updateEssay(essay.id, payload);
    if (error) {
      setError("Failed to update. Please try again.");
      setSaving(false);
    } else {
      navigate("/admin/essays");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <p className="section-label mb-1">Edit</p>
        <h1 className="font-serif text-4xl text-ink font-light line-clamp-2">{essay.title}</h1>
        <div className="rule" />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <PostForm
        type="essay"
        initial={essay}
        saving={saving}
        onSave={handleSave}
        onCancel={() => navigate("/admin/essays")}
      />
    </div>
  );
}
