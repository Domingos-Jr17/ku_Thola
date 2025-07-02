import React, { useMemo } from "react";

interface Props {
  jobRequirements: string[];
  candidateSkills: string[];
}

export const JobMatchingScore: React.FC<Props> = ({ jobRequirements, candidateSkills }) => {
  const score = useMemo(() => {
    const matched = jobRequirements.filter((req) =>
      candidateSkills.map((s) => s.toLowerCase()).includes(req.toLowerCase())
    );
    return Math.round((matched.length / jobRequirements.length) * 100);
  }, [jobRequirements, candidateSkills]);

  const getColorClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLabel = (score: number) => {
    if (score >= 80) return "Alta";
    if (score >= 50) return "Média";
    return "Baixa";
  };

  return (
    <div className="w-full" title={`Compatibilidade: ${score}%`}>
      <div className="flex items-center gap-2">
        <div
          className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={score}
        >
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${getColorClass(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="text-sm text-gray-700 w-16 text-right">
          {score}% <span className="text-xs text-gray-500">({getLabel(score)})</span>
        </div>
      </div>
    </div>
  );
};
