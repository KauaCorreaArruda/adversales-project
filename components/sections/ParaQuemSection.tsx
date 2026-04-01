import { CheckCircle, XCircle } from "lucide-react";

const paraQuem = [
  "Presta serviços B2B com ticket acima de R$5.000",
  "Já tem um produto/serviço validado e quer escalar",
  "Tem time comercial (ou está estruturando um)",
  "Busca demanda qualificada, não volume genérico",
  "Quer integrar marketing e vendas de forma estratégica",
  "Está disposto a construir um sistema, não só rodar anúncios",
];

const naoParaQuem = [
  "Negócios B2C com ticket baixo",
  "Quem quer resultado sem investir em tráfego",
  "Empresas sem processo comercial definido",
  "Quem busca soluções prontas e genéricas",
];

export default function ParaQuemSection() {
  return (
    <section id="para-quem" className="section-solid relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs tracking-widest text-red-400 uppercase">
            Para Quem É
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            O AdverSales é feito{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              para você?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-red-500/15 p-2">
                <CheckCircle className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Sim, é para você se...</h3>
            </div>
            <ul className="space-y-4">
              {paraQuem.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0f0606] p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-white/5 p-2">
                <XCircle className="h-5 w-5 text-slate-500" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Não é para você se...</h3>
            </div>
            <ul className="space-y-4">
              {naoParaQuem.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                  <span className="text-slate-500">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-white/5 bg-white/3 p-4">
              <p className="text-sm text-slate-500">
                Somos seletivos com os clientes que aceitamos. Trabalhamos em parceria profunda — não como fornecedor de serviço.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
