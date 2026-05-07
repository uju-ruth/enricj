import { Link } from "react-router-dom";
import { useEssays, usePublications } from "../../hooks/useStore";

export default function AdminDashboard() {
  const { essays, loading: eLoading } = useEssays();
  const { publications, loading: pLoading } = usePublications();

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <p className="section-label mb-1">Overview</p>
        <h1 className="font-serif text-4xl text-ink font-light">Dashboard</h1>
        <div className="rule" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <Link to="/admin/essays" className="border-l-4 border-sienna bg-white px-6 py-5 hover:shadow-sm transition-shadow">
          <p className="font-serif text-5xl text-ink font-light">
            {eLoading ? "—" : essays.length}
          </p>
          <p className="text-stone text-sm mt-1">Total Essays</p>
        </Link>
        <Link to="/admin/publications" className="border-l-4 border-ink bg-white px-6 py-5 hover:shadow-sm transition-shadow">
          <p className="font-serif text-5xl text-ink font-light">
            {pLoading ? "—" : publications.length}
          </p>
          <p className="text-stone text-sm mt-1">Total Publications</p>
        </Link>
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <p className="section-label mb-4">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/essays/new"       className="btn-fill">+ New Essay</Link>
          <Link to="/admin/publications/new" className="btn-outline">+ New Publication</Link>
        </div>
      </div>

      {/* Recent essays */}
      <div>
        <p className="section-label mb-4">Recent Essays</p>
        {eLoading ? (
          <p className="text-stone text-sm italic">Loading...</p>
        ) : essays.length === 0 ? (
          <p className="text-stone text-sm italic">No essays yet.</p>
        ) : (
          essays.slice(0, 5).map((e) => (
            <div key={e.id} className="flex items-center justify-between border-t border-mist py-3">
              <p className="font-serif text-lg text-ink truncate max-w-xs">{e.title}</p>
              <Link
                to={`/admin/essays/edit/${e.id}`}
                className="text-sienna text-xs tracking-widest uppercase hover:text-ink transition-colors flex-shrink-0 ml-4"
              >
                Edit →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
