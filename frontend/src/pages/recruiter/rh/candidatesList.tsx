import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { JobMatchingScore } from "@/components/cards/JobMatchingScore";
import { useCandidateContext } from "@/context/useCandidateContext";

// Simulação de requisitos de uma vaga (poderia vir via contexto)
const jobRequirements = ["React", "TypeScript", "CSS", "HTML"];

export const CandidatesList = () => {
  const navigate = useNavigate();
  const { candidates } = useCandidateContext();

  const [minCompatibility, setMinCompatibility] = useState(0);
  const [searchName, setSearchName] = useState("");

  // Calcula a pontuação de compatibilidade com base nas skills do candidato
  const calculateScore = (requirements: string[], skills: string[]) => {
    const matchCount = requirements.filter((req) =>
      skills.some((skill) => skill.toLowerCase() === req.toLowerCase())
    ).length;
    return Math.round((matchCount / requirements.length) * 100);
  };

  // Cria lista filtrada e ordenada de candidatos
  const filteredCandidates = useMemo(() => {
    return candidates
      .map((candidate) => ({
        ...candidate,
        compatibilityScore: calculateScore(jobRequirements, candidate.skills || [])
      }))
      .filter((c) =>
        c.compatibilityScore >= minCompatibility &&
        c.name.toLowerCase().includes(searchName.toLowerCase())
      )
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [candidates, minCompatibility, searchName]);

  // Média geral de compatibilidade (opcional)
  const averageScore = useMemo(() => {
    if (filteredCandidates.length === 0) return 0;
    const total = filteredCandidates.reduce((sum, c) => sum + c.compatibilityScore, 0);
    return Math.round(total / filteredCandidates.length);
  }, [filteredCandidates]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Candidatos</h1>

      {/* Filtros */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border border-gray-300 rounded px-3 py-2 flex-1"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <span>Compatibilidade mínima:</span>
          <input
            type="number"
            min={0}
            max={100}
            value={minCompatibility}
            onChange={(e) => setMinCompatibility(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-20"
          />
          <span>%</span>
        </label>
      </div>

      {/* Estatísticas de resultados */}
      <div className="text-sm text-gray-600 mb-4">
        Mostrando <strong>{filteredCandidates.length}</strong> de <strong>{candidates.length}</strong> candidatos |
        Média de compatibilidade: <strong>{averageScore}%</strong>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Contacto</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Vaga</th>
              <th className="px-4 py-2">Compatibilidade</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-600">
                  Nenhum candidato encontrado com os filtros aplicados.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/rh/candidato/${candidate.id}`)}
                >
                  <td className="px-4 py-2 text-gray-800">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.phone}</td>
                  <td className="px-4 py-2 text-blue-600 underline">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.jobTitle}</td>
                  <td className="px-4 py-2 w-36" title={`${candidate.compatibilityScore}%`}>
                    <JobMatchingScore
                      jobRequirements={jobRequirements}
                      candidateSkills={candidate.skills || []}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
