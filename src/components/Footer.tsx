export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-brand-400 font-bold text-sm">&lt;IM /&gt;</p>
        <p className="text-slate-600 text-xs text-center">
          © {new Date().getFullYear()} Isidro Mendes — Construído com React, TypeScript & Tailwind
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="glow-dot w-1.5 h-1.5" />
          Online
        </div>
      </div>
    </footer>
  )
}
