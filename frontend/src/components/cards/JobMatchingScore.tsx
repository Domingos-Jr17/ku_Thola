import React, { useMemo } from "react";

interface Props {
  jobRequirements: string[];     // Lista de requisitos da vaga (ex: ["React", "CSS"])
  candidateSkills: string[];     // Habilidades do candidato (ex: ["React", "Tailwind"])
}

export const JobMatchingScore: React.FC<Props> = ({ jobRequirements, candidateSkills }) => {
  // Cálculo da pontuação de compatibilidade
  const score = useMemo(() => {
    const normalizedSkills = candidateSkills.map(skill => skill.toLowerCase());
    const matched = jobRequirements.filter(req =>
      normalizedSkills.includes(req.toLowerCase())
    );
    return Math.round((matched.length / jobRequirements.length) * 100);
  }, [jobRequirements, candidateSkills]);

  // Define a cor da barra com base na pontuação
  const getColorClass = (score: number) => {
    if (score >= 80) return "bg-green-500"; // Alta compatibilidade
    if (score >= 50) return "bg-yellow-500"; // Compatibilidade média
    return "bg-red-500"; // Baixa compatibilidade
  };

  // Define o rótulo textual da pontuação
  const getLabel = (score: number) => {
    if (score >= 80) return "Alta";
    if (score >= 50) return "Média";
    return "Baixa";
  };

  return (
    <div className="w-full" title={`Compatibilidade: ${score}%`}>
      <div className="flex items-center gap-2">
        {/* Barra de fundo */}
        <div
          className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={score}
        >
          {/* Barra preenchida */}
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${getColorClass(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Texto com a porcentagem e rótulo */}
        <div className="text-sm text-gray-700 w-16 text-right">
          {score}% <span className="text-xs text-gray-500">({getLabel(score)})</span>
        </div>
      </div>
    </div>
  );
};
