import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { ApplicationCard } from "@/components/cards/forms/ApplicationCard";

type ApplicationProps = {
  jobId: string;
  jobTitle: string;
  status: string;
};

type CandidateProps = {
  name: string;
  email: string;
  phone: string;
  cvUrl: string;
  applications: ApplicationProps[];
};

const SkeletonCard = () => (
  <div className="animate-pulse p-4 border rounded-md shadow-sm mb-4 bg-gray-200 h-14 w-full" />
);

export const CandidateProfile = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState<CandidateProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      // ⚠️ Substitua este bloco por fetch real quando backend estiver pronto
      // const response = await fetch(`/api/candidates/${candidateId}`);
      // if (!response.ok) throw new Error("Falha ao carregar dados do candidato");
      // const data: CandidateProps = await response.json();

      // MOCK TEMPORÁRIO para testes sem backend
      const data: CandidateProps = {
        name: "Domingos Timane",
        email: "domingos.timane@email.com",
        phone: "+258 84 000 0000",
        cvUrl: "https://example.com/cv.pdf",
        applications: [
          {
            jobId: "123",
            jobTitle: "Engenheiro Civil",
            status: "Entrevista marcada",
          },
          {
            jobId: "456",
            jobTitle: "Analista de Dados",
            status: "Rejeitado",
          },
        ],
      };

      setCandidate(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao buscar candidato.");
      }
      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (candidateId) {
      fetchCandidate();
    }
  }, [candidateId]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <main>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : error ? (
            <div className="text-center text-red-600 font-semibold my-8">
              <p>{error}</p>
              <Button variant="outline" onClick={fetchCandidate} className="mt-4">
                Tentar Novamente
              </Button>
            </div>
          ) : candidate ? (
            <>
              <h1 className="text-3xl font-semibold mb-4 text-primary-700">
                {candidate.name}
              </h1>
              <div className="mb-6 space-y-1 text-gray-700">
                <p>
                  <strong>Email:</strong> {candidate.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {candidate.phone}
                </p>
                <p>
                  <a
                    href={candidate.cvUrl}
                    download
                    className="text-primary-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download do CV de ${candidate.name}`}
                  >
                    Download do CV
                  </a>
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Histórico de Candidaturas
                </h2>
                {candidate.applications.length === 0 ? (
                  <p className="text-gray-500 italic">
                    Nenhuma candidatura encontrada.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {candidate.applications.map((application) => (
                      <ApplicationCard
                        key={application.jobId}
                        application={application}
                      />
                    ))}
                  </ul>
                )}
              </section>

              <div className="mt-8">
                <Button
                  aria-label={`Agendar entrevista para ${candidate.name}`}
                  onClick={() => navigate(`/rh/candidato/${candidateId}/avaliacao`)}
                >
                  Agendar Entrevista
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-red-600 font-semibold mt-10">
              Candidato não encontrado.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
