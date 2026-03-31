"use client";

const metricas = [
  { valor: "3x",   label: "aumento médio na taxa de conversão de leads para vendas" },
  { valor: "67%",  label: "redução no tempo de qualificação com automações e IA" },
  { valor: "40%",  label: "queda no CPL com segmentação cirúrgica de anúncios" },
  { valor: "R$0",  label: "de retrabalho operacional para o time comercial" },
];

const depoimentos = [
  {
    nome: "Carlos Mendes",
    cargo: "CEO, Consultoria Financeira B2B",
    texto: "Antes chegavam 80 leads por mês, fechávamos 2. Hoje chegam 40 e fechamos 8. O perfil mudou completamente — são exatamente os clientes que queremos.",
  },
  {
    nome: "Fernanda Luz",
    cargo: "Diretora Comercial, Software Empresarial",
    texto: "O que mais me surpreendeu foi a integração. Meu time não perde mais tempo em leads frios. O pipeline anda sozinho e o comercial só entra quando está quente.",
  },
  {
    nome: "Ricardo Tavares",
    cargo: "Fundador, Agência de RH Executivo",
    texto: "Em 60 dias já tínhamos um pipeline de R$800k em propostas abertas. Antes não conseguíamos nem preencher a agenda do comercial.",
  },
];

export default function ResultadosSection() {
  return (
    <section id="resultados" className="section-solid relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs tracking-widest text-red-400 uppercase">
            Resultados
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Números que{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              falam por si
            </span>
          </h2>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {metricas.map((m, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-[#0f0606] p-8 text-center transition-all duration-300 hover:border-red-500/20 cursor-default">
              <div className="text-4xl font-black text-red-400 md:text-5xl">{m.valor}</div>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {depoimentos.map((d, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-[#0f0606] p-8 transition-all duration-300 hover:border-red-500/15 cursor-default">
              <div className="mb-4 text-4xl font-black text-red-500/30">&ldquo;</div>
              <p className="text-slate-300 leading-relaxed italic">{d.texto}</p>
              <div className="mt-6 border-t border-white/5 pt-6">
                <div className="font-bold text-white">{d.nome}</div>
                <div className="mt-1 text-sm text-slate-500">{d.cargo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
