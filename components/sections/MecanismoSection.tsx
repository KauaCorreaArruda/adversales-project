import { Crosshair, Zap, Bot } from "lucide-react";

const pilares = [
  {
    icon: Crosshair,
    label: "Adver",
    titulo: "Anúncios de Precisão",
    descricao: "Usamos tráfego pago como sniper: segmentação cirúrgica para atrair apenas o público que tem perfil, budget e urgência para o seu serviço high ticket.",
    cor: "#DC2626",
    corBg: "rgba(220,38,38,0.08)",
    corBorder: "rgba(220,38,38,0.18)",
  },
  {
    icon: Zap,
    label: "Sales",
    titulo: "Funil Integrado com Vendas",
    descricao: "O lead não cai no vácuo. Criamos estruturas de funil que avançam o prospect no processo comercial com velocidade acima do comum — do primeiro clique ao fechamento.",
    cor: "#EF4444",
    corBg: "rgba(239,68,68,0.08)",
    corBorder: "rgba(239,68,68,0.18)",
  },
  {
    icon: Bot,
    label: "IA + Automação",
    titulo: "Operação sem Retrabalho",
    descricao: "Integramos automações e IA para eliminar o trabalho manual de análise de pipeline e qualificação. Seu comercial foca só em fechar.",
    cor: "#F87171",
    corBg: "rgba(248,113,113,0.08)",
    corBorder: "rgba(248,113,113,0.18)",
  },
];

export default function MecanismoSection() {
  return (
    <section id="mecanismo" className="section-solid relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-red-900/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs tracking-widest text-red-400 uppercase">
            Nossa Metodologia
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            O mecanismo{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              AdverSales
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Advertising e Sales não são dois departamentos. São um sistema único, integrado, que funciona como motor de crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pilares.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] cursor-default"
                style={{ borderColor: p.corBorder, backgroundColor: p.corBg }}
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-xl p-3"
                  style={{ backgroundColor: p.corBg, border: `1px solid ${p.corBorder}` }}
                >
                  <Icon className="h-6 w-6" style={{ color: p.cor }} />
                </div>
                <div className="mb-2 text-xs font-bold tracking-widest uppercase" style={{ color: p.cor }}>
                  {p.label}
                </div>
                <h3 className="mb-4 text-xl font-extrabold text-white">{p.titulo}</h3>
                <p className="text-slate-400 leading-relaxed">{p.descricao}</p>
                <div className="absolute top-6 right-6 text-5xl font-black opacity-10" style={{ color: p.cor }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 hidden md:flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-600/30" />
          <span className="rounded-full border border-red-500/25 bg-red-500/8 px-6 py-2 text-sm font-semibold text-red-300">
            Um sistema, não três serviços
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-600/30" />
        </div>
      </div>
    </section>
  );
}
