import Header from "@/components/Header";
import Calculators from "@/components/Calculators";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-5">
        <section className="py-16 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
            💊 Free tool for pharmacists
          </span>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl">
            Pharma
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Calc
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Five everyday clinical calculators in one place. Fast, private and free. Nothing you type
            leaves your device.
          </p>
        </section>

        <Calculators />

        <section
          aria-label="Disclaimer"
          className="my-16 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm leading-relaxed text-amber-100"
        >
          <strong className="text-amber-200">For education and quick checks only.</strong> These
          results are estimates. Always confirm doses against the product label and current
          guidelines, and use your clinical judgment before acting on any number.
        </section>
      </main>
      <Footer />
    </div>
  );
}