
export const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-primary-700">Sobre o Ku Thola</h1>
      <p className="text-lg leading-relaxed">
        O Ku Thola é uma plataforma moçambicana que conecta talentos a oportunidades de trabalho.
        Com foco em usabilidade e inclusão, buscamos tornar o processo de recrutamento simples, rápido e transparente.
      </p>
      <p className="text-lg leading-relaxed">
        Nossa missão é empoderar candidatos e oferecer às empresas as melhores ferramentas para seleção de talentos.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Nossa História</h2>
        <p className="text-gray-700">
          Fundado em 2024, o Ku Thola nasceu da necessidade de aproximar jovens talentos moçambicanos de oportunidades reais no mercado de trabalho, superando barreiras tecnológicas e sociais.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Nossa Equipe</h2>
        <p className="text-gray-700">
          Somos um grupo de profissionais apaixonados por tecnologia, desenvolvimento social e empreendedorismo, dedicados a transformar vidas através da inovação.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contato</h2>
        <p className="text-gray-700">
          Para dúvidas, sugestões ou parcerias, envie um email para <a href="mailto:contato@kuthola.co.mz" className="text-primary-600 underline">contato@kuthola.co.mz</a>.
        </p>
      </section>
    </div>
  );
};
