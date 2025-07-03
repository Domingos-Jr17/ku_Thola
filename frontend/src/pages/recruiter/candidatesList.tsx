import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { JobMatchingScore } from "@/components/cards/JobMatchingScore";

interface Candidate {
  name: string;
  phones: string;
  email: string;
  jobTitle: string;
  skills: string[];
}

const jobRequirements = ["React", "TypeScript", "CSS", "HTML"];

const mockCandidates: Candidate[] = [
  { name: "Albertina Dlambe", phones: "871522004 / 850221504", email: "dlambealbertina@gmail.com", jobTitle: "Desenvolvedor Frontend", skills: ["React", "TypeScript", "CSS", "HTML"] },
  { name: "Almório Adolfo Chaguala", phones: "844138349/871038349", email: "almorioadolfo01@gmail.com", jobTitle: "Analista de Marketing", skills: ["SEO", "Google Ads", "Copywriting"] },
  { name: "Graça Boaventura Bila", phones: "858768416", email: "gracabilla002@gmail.com", jobTitle: "Desenvolvedor Frontend", skills: ["React", "HTML", "CSS"] },
  { name: "Jorge Bernardo Langa", phones: "873559810", email: "jorgebernardolanga@gmail.com", jobTitle: "Analista de Marketing", skills: ["Marketing Digital", "Excel", "Social Media"] },
  { name: "Neyla Feliza Américo Chavane", phones: "847943500", email: "neylachavane0@gmail.com", jobTitle: "Desenvolvedor Frontend", skills: ["TypeScript", "Tailwind", "Git"] },
  { name: "Domingos A. Timane Jr", phones: "820885159/855735760", email: "domingosalfredotimane@gmail.com", jobTitle: "Desenvolvedor Frontend", skills: ["React", "TypeScript", "Figma", "HTML", "CSS"] },
];

export const CandidatesList = () => {
  const navigate = useNavigate();
  useJobs();

  const [minCompatibility, setMinCompatibility] = useState(0);
  const [searchName, setSearchName] = useState("");

  const calculateScore = (requirements: string[], skills: string[]) => {
    const matchCount = requirements.filter(req =>
      skills.some(skill => skill.toLowerCase() === req.toLowerCase())
    ).length;
    return Math.round((matchCount / requirements.length) * 100);
  };

  // Filtrar e ordenar candidatos
  const filteredCandidates = useMemo(() => {
    return mockCandidates
      .map(candidate => ({
        ...candidate,
        compatibilityScore: calculateScore(jobRequirements, candidate.skills)
      }))
      .filter(c =>
        c.compatibilityScore >= minCompatibility &&
        c.name.toLowerCase().includes(searchName.toLowerCase())
      )
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [minCompatibility, searchName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Candidatos</h1>

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
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
              filteredCandidates.map((candidate, idx) => (
                <tr
                  key={candidate.email}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/rh/candidato/${idx}`)}
                >
                  <td className="px-4 py-2 text-gray-800">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.phones}</td>
                  <td className="px-4 py-2 text-blue-600 underline">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.jobTitle}</td>
                  <td className="px-4 py-2 w-36">
                    <JobMatchingScore
                      jobRequirements={jobRequirements}
                      candidateSkills={candidate.skills}
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
function useJobs() {
  throw new Error("Function not implemented.");
}

