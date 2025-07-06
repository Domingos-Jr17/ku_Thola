
export const CandidateScoreCard = ({ name, score, notes }: { name: string; score: number; notes: string }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-700 mt-2">Pontuação: <strong>{score}/10</strong></p>
      <p className="text-sm text-gray-600 mt-2">{notes}</p>
    </div>
  );
};

