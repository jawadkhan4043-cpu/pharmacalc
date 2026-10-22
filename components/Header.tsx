export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060d24]/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a href="#" className="font-display text-xl font-extrabold text-white">
          Pharma<span className="text-blue-500">Calc</span>
        </a>
        <a
          href="#tools"
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Open calculators
        </a>
      </nav>
    </header>
  );
}