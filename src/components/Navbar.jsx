import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-[0.72rem] tracking-[0.14em] uppercase transition-colors duration-200 ${
      isActive ? "text-ink border-b border-sienna pb-px" : "text-stone hover:text-ink"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-ivory/90 backdrop-blur-md border-b border-mist">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-medium tracking-wide text-ink">enricj</Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/publications" className={linkClass}>Publications</NavLink>
          <NavLink to="/essays" className={linkClass}>Essays</NavLink>
          <NavLink to="/contact" className="btn-fill !py-2 !px-5 text-[0.72rem]">Contact</NavLink>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer" aria-label="Toggle menu">
          <span className={`w-5 h-px bg-ink block transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`w-5 h-px bg-ink block transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-px bg-ink block transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col px-6 pb-5 gap-4 border-t border-mist bg-ivory">
          {[{to:"/",label:"Home",end:true},{to:"/about",label:"About"},{to:"/publications",label:"Publications"},{to:"/essays",label:"Essays"},{to:"/contact",label:"Contact"}].map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
              className={({ isActive }) => `text-[0.72rem] tracking-[0.14em] uppercase py-1 transition-colors ${isActive ? "text-ink" : "text-stone hover:text-ink"}`}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
