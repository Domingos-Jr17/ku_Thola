import { useParams, useNavigate } from "react-router-dom";
import { useJobContext } from "@/hooks/useJobContext";
import { Header } from "@/components/layout/headers";
import { Footer } from "@/components/layout/footer";
import { CandidateScoreCard } from "@/components/cards/CandidateScoreCard";

// Mock de candidatos para demonstração
const mockRankedCandidates = [
  { id: "cand1", name: "Albertina Dlambe", score: 9, notes: "Excelentes habilidades em React e comunicação." },
  { id: "cand2", name: "Graça Boaventura Bila", score: 8.5, notes: "Boa experiência em frontend e cultura de equipe." },
  { id: "cand3", name: "Domingos A. Timane Jr", score: 8, notes: "Boa aptidão técnica e participação ativa." },
];

export const JobMatching = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useJobContext();
  const navigate = useNavigate();

  // Busca vaga pelo id da URL
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

  // TODO: substituir mockRankedCandidates pelo cálculo real baseado em job.candidatos
  // const rankedCandidates = calculateCandidateScores(job.candidatos);

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/rh/vagas")}
          className="text-blue-600 mb-4 hover:underline"
          aria-label="Voltar para lista de vagas"
        >
          ← Voltar para vagas
        </button>

        <h1 className="text-2xl font-semibold mb-2">Matching Automático</h1>
        <p className="text-gray-700 mb-6">
          Ranking de candidatos com melhor adequação para a vaga:{" "}
          <strong>{job.title}</strong>
        </p>

        {mockRankedCandidates.length === 0 ? (
          <p className="text-gray-600">Nenhum candidato encontrado para esta vaga.</p>
        ) : (
          <div className="space-y-4">
            {mockRankedCandidates.map(({ id, name, score, notes }) => (
              <CandidateScoreCard key={id} name={name} score={score} notes={notes} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JobMatching;
