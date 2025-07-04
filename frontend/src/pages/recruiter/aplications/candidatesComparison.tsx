import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidateContext } from "@/hooks/useCandidateContext";
import { JobMatchingScore } from "@/components/cards/JobMatchingScore";
import { calculateCompatibility } from "@/utils/calculateCompatibility";

// Requisitos padrão para comparação geral
const defaultJobRequirements = ["JavaScript", "React", "TypeScript", "CSS", "HTML"];

export const CandidateComparison = () => {
  const navigate = useNavigate();
  const { candidates } = useCandidateContext();

  const [searchName, setSearchName] = useState("");
  const [minScore, setMinScore] = useState(0);

  const filteredCandidates = useMemo(() => {
    return candidates
      .map(candidate => {
        const score = calculateCompatibility(defaultJobRequirements, candidate.skills);
        return { ...candidate, compatibilityScore: score };
      })
      .filter(c =>
        c.compatibilityScore >= minScore &&
        c.name.toLowerCase().includes(searchName.toLowerCase())
      )
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [candidates, searchName, minScore]);

  const averageScore = useMemo(() => {
    if (filteredCandidates.length === 0) return 0;
    const total = filteredCandidates.reduce((sum, c) => sum + c.compatibilityScore, 0);
    return Math.round(total / filteredCandidates.length);
  }, [filteredCandidates]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Comparação Geral de Talentos</h1>
      <p className="text-gray-600 mb-6">
        Avaliação de candidatos com base em requisitos técnicos padrão da empresa.
      </p>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border rounded px-3 py-2 flex-1"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm">
          Compatibilidade mínima:
          <input
            type="number"
            value={minScore}
            min={0}
            max={100}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
          %
        </label>
      </div>

      {/* Estatísticas */}
      <div className="text-sm text-gray-600 mb-4">
        Mostrando <strong>{filteredCandidates.length}</strong> de{" "}
        <strong>{candidates.length}</strong> candidatos | Média de compatibilidade:{" "}
        <strong>{averageScore}%</strong>
      </div>

      {/* Tabela de comparação */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Contacto</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Vaga Atual</th>
              <th className="px-4 py-2">Compatibilidade</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-600">
                  Nenhum candidato encontrado com os critérios atuais.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/rh/candidato/${candidate.id}`)}
                >
                  <td className="px-4 py-2">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.phone}</td>
                  <td className="px-4 py-2 text-blue-600 underline">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.jobTitle || "—"}</td>
                  <td className="px-4 py-2 w-36">
                    <JobMatchingScore
                      jobRequirements={defaultJobRequirements}
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

export default CandidateComparison;
