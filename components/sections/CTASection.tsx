import { ArrowRight, Calendar } from "lucide-react";

export default function CTASection() {
  return (
    <section id="cta" className="section-solid relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/12 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs tracking-widest text-red-400 uppercase">
          Próximo Passo
        </span>

        <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
          Pronto para escalar com{" "}
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            demanda qualificada?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Agende um diagnóstico gratuito. Em 45 minutos analisamos seu negócio, identificamos os gargalos e mostramos como o sistema AdverSales funcionaria para você.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-[#DC2626] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-[#EF4444] hover:gap-4 cursor-pointer"
          >
            <Calendar className="h-5 w-5" />
            Agendar Diagnóstico Gratuito
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#mecanismo"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-base font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:text-white cursor-pointer"
          >
            Ver como funciona
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Sem compromisso. Diagnóstico 100% gratuito e personalizado.
        </p>

        <div className="mt-20 border-t border-white/5 pt-12">
          <div className="flex flex-col items-center gap-2">
            <div className="text-xl font-black tracking-tight text-white">AdverSales</div>
            <p className="text-sm text-slate-600">Advertising + Sales · Demanda Qualificada para B2B High Ticket</p>
          </div>
        </div>
      </div>
    </section>
  );
}
