"use client";

import { Search, GitBranch, TrendingUp } from "lucide-react";

const etapas = [
  {
    numero: "01",
    icon: Search,
    titulo: "Diagnóstico e Estratégia",
    descricao:
      "Analisamos seu negócio, ICP, ativos existentes e estado atual. Definimos o funil ideal e a estratégia de anúncios baseada no seu contexto — nada genérico.",
    destaque: "Personalização total antes de qualquer execução.",
  },
  {
    numero: "02",
    icon: GitBranch,
    titulo: "Atração + Estrutura de Funil",
    descricao:
      "Ativamos os anúncios com segmentação cirúrgica e montamos a estrutura de funil que guia o lead do primeiro contato até o comercial — com velocidade e clareza.",
    destaque: "Lead certo, no momento certo, para o lugar certo.",
  },
  {
    numero: "03",
    icon: TrendingUp,
    titulo: "Automação, IA e Escala",
    descricao:
      "Integramos automações e IA para qualificar, nutrir e empurrar leads no pipeline automaticamente. Seu time foca só nos que estão prontos para fechar.",
    destaque: "Escala sem aumentar headcount operacional.",
  },
];

export default function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="section-solid relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs tracking-widest text-red-400 uppercase">
            Como Funciona
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Do zero ao pipeline{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              em 3 etapas
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-red-600/50 via-red-500/25 to-transparent hidden md:block" />

          <div className="space-y-12">
            {etapas.map((etapa, i) => {
              const Icon = etapa.icon;
              return (
                <div key={i} className="group relative flex gap-8 md:ml-8">
                  <div className="relative hidden md:flex shrink-0 -ml-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/8">
                      <Icon className="h-6 w-6 text-red-400" />
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl border border-white/5 bg-[#0f0606] p-8 transition-all duration-300 group-hover:border-red-500/20 cursor-default">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-2 text-xs font-bold tracking-widest text-red-500 uppercase">
                          Etapa {etapa.numero}
                        </div>
                        <h3 className="text-2xl font-extrabold text-white">{etapa.titulo}</h3>
                      </div>
                      <div className="shrink-0 text-4xl font-black text-white/5">{etapa.numero}</div>
                    </div>

                    <p className="mt-4 text-slate-400 leading-relaxed">{etapa.descricao}</p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-500/18 bg-red-500/6 px-4 py-2 text-sm text-red-300 font-semibold">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {etapa.destaque}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
