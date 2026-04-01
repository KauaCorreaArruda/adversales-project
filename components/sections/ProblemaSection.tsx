import { XCircle } from "lucide-react";

const problemas = [
  {
    titulo: "Leads que não convertem",
    descricao: "Você atrai volume, mas chega prospects sem perfil, sem urgência e sem dinheiro. Seu comercial perde tempo com quem nunca vai fechar.",
  },
  {
    titulo: "Marketing e vendas desconectados",
    descricao: "O marketing gera leads no vácuo. O comercial não tem contexto. Ninguém sabe onde o lead está no processo — e a oportunidade some.",
  },
  {
    titulo: "Pipeline parado, operação manual",
    descricao: "Seu time passa o dia analisando CRM e ligando para leads frios. Sem automação, sem inteligência — só retrabalho que não escala.",
  },
  {
    titulo: "Alto ticket exige alta precisão",
    descricao: "Negócios B2B high ticket não sobrevivem com estratégias de volume genérico. Cada lead errado é custo real, não apenas métrica.",
  },
];

export default function ProblemaSection() {
  return (
    <section id="problema" className="section-solid relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs tracking-widest text-red-400 uppercase">
            O Problema
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Por que a maioria dos B2B{" "}
            <span className="text-red-500">não escala vendas</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Não é falta de produto. É falta de integração entre quem atrai e quem fecha.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {problemas.map((p, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/5 bg-[#0f0606] p-8 transition-all duration-300 hover:border-red-500/25 cursor-default"
            >
              <div className="mb-4 flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <h3 className="text-lg font-bold text-white">{p.titulo}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">{p.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-red-500/15 bg-red-500/5 px-8 py-8 text-center">
          <p className="text-xl font-bold text-white md:text-2xl">
            &ldquo;O problema não é gerar leads. É gerar{" "}
            <span className="text-red-400">os leads certos</span>, na hora certa, prontos para comprar.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
