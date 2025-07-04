import { useParams, useNavigate } from "react-router-dom";
import { useJobContext } from "@/hooks/useJobContext";
import { Header } from "@/components/layout/headers";
import { Footer } from "@/components/layout/footer";
import { CandidateScoreCard } from "@/components/cards/CandidateScoreCard";
import { calculateCandidateScores } from "@/utils/calculateCandidateScores"; // novo import

export const JobMatching = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useJobContext();
  const navigate = useNavigate();

  const job = jobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div>
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => navigate("/rh/vagas")}
            className="text-blue-600 mb-4 hover:underline"
          >
            ← Voltar para vagas
          </button>
          <h1 className="text-xl font-semibold text-red-600">Vaga não encontrada</h1>
          <p>Por favor, selecione uma vaga válida para ver o matching.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const rankedCandidates = calculateCandidateScores(job); // agora vem da função externa

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/rh/vagas")}
          className="text-blue-600 mb-4 hover:underline"
        >
          ← Voltar para vagas
        </button>

        <h1 className="text-2xl font-semibold mb-2">Matching Automático</h1>
        <p className="text-gray-700 mb-6">
          Ranking de candidatos com melhor adequação para a vaga:{" "}
          <strong>{job.title}</strong>
        </p>

        {rankedCandidates.length === 0 ? (
          <p className="text-gray-600">Nenhum candidato encontrado para esta vaga.</p>
        ) : (
          <div className="space-y-4">
            {rankedCandidates.map(({ id, name, score, notes }) => (
              <CandidateScoreCard
                key={id}
                name={name}
                score={score}
                notes={notes}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
