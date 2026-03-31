import HeroSection from "@/components/sections/HeroSection";
import ProblemaSection from "@/components/sections/ProblemaSection";
import MecanismoSection from "@/components/sections/MecanismoSection";
import ComoFuncionaSection from "@/components/sections/ComoFuncionaSection";
import ResultadosSection from "@/components/sections/ResultadosSection";
import ParaQuemSection from "@/components/sections/ParaQuemSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemaSection />
      <MecanismoSection />
      <ComoFuncionaSection />
      <ResultadosSection />
      <ParaQuemSection />
      <CTASection />
    </main>
  );
}
