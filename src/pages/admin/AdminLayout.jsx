import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useStore";
import { useEffect } from "react";

export default function AdminLayout() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!authed) navigate("/admin"); }, [authed, navigate]);
  if (!authed) return null;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-sm ${isActive ? "bg-sienna text-ivory" : "text-stone hover:text-ink hover:bg-mist"}`;

  return (
    <div className="min-h-screen bg-ivory flex">
      <aside className="w-56 border-r border-mist flex flex-col fixed top-0 left-0 h-full bg-ivory z-40">
        <div className="px-6 py-6 border-b border-mist">
          <p className="font-serif text-xl text-ink">enricj</p>
          <p className="section-label mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          <NavLink to="/admin/dashboard" end className={linkClass}><span>📊</span> Dashboard</NavLink>
          <NavLink to="/admin/essays"        className={linkClass}><span>✍️</span> Essays</NavLink>
          <NavLink to="/admin/publications"  className={linkClass}><span>📄</span> Publications</NavLink>
        </nav>
        <div className="px-3 py-4 border-t border-mist flex flex-col gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone hover:text-ink hover:bg-mist rounded-sm transition-colors">
            <span>🌐</span> View Site
          </a>
          <button onClick={() => { logout(); navigate("/admin"); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone hover:text-red-500 hover:bg-mist rounded-sm transition-colors text-left w-full">
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>
      <div className="ml-56 flex-1 p-8 min-h-screen"><Outlet /></div>
    </div>
  );
}
