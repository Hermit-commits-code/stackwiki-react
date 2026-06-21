import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Categories", href: "/categories" },
  { label: "Converter", href: "/transcript-converter" },
  { label: "Conversions", href: "/conversions" },
  { label: "Login", href: "/login" },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-bold text-cyan-400">
            StackWiki
          </NavLink>

          <nav className="flex gap-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
