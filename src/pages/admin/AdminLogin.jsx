import { useState } from "react";
import { useAuth } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(password);
      if (ok) { navigate("/admin/dashboard"); }
      else { setError("Incorrect password. Try again."); setLoading(false); }
    }, 400);
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-3xl text-ink">enricj</p>
          <p className="section-label mt-2">Admin Access</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="section-label block mb-2">Password</label>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder="Enter admin password" autoFocus className="w-full border border-ash bg-transparent px-4 py-3 text-ink placeholder-ash text-sm outline-none focus:border-ink transition-colors" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading || !password} className="btn-fill w-full py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
        <p className="text-ash text-xs text-center mt-8">This area is restricted to the site owner.</p>
      </div>
    </div>
  );
}
