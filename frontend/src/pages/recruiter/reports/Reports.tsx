import { CandidatesPerJobChart } from "@/components/rechart";

export const Reports = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">📊 Relatórios de Recrutamento</h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Acompanhe abaixo as principais métricas do processo de recrutamento:
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
          <li>Número de candidatos por vaga</li>
          <li>Tempo médio de contratação</li>
          <li>Taxas de aprovação e rejeição</li>
          <li>Análises comparativas por período</li>
        </ul>
      </p>

      {/* Gráfico: Candidatos por Vaga */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidatos por Vaga</h2>
        <CandidatesPerJobChart />
      </div>

      {/* Placeholder para futuros gráficos */}
      <div className="bg-white shadow-sm rounded-lg border border-dashed border-gray-300 p-8 flex items-center justify-center h-56">
        <p className="text-gray-400 italic select-none">
          Mais relatórios gráficos e análises serão adicionados futuramente.
        </p>
      </div>
    </div>
  );
};
