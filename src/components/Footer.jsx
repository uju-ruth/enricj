import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="border-t border-mist mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-serif text-xl text-ink">enricj</Link>
        <a href="mailto:okpolihenry@gmail.com" className="text-stone text-sm hover:text-ink transition-colors">okpolihenry@gmail.com</a>
        <span className="text-ash text-xs">© 2026 enricj</span>
      </div>
    </footer>
  );
}
