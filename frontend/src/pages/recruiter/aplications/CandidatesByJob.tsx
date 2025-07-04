import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useJobContext } from "@/hooks/useJobContext";
import { Button } from "@/components/ui/Button";
import { ScheduleInterviewModal } from "@/components/cards/forms/ScheduleInterviewModal";

export const CandidatesByJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, avaliarCandidato, agendarEntrevista } = useJobContext();

  const job = getJobById(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{ id: string; nome: string } | null>(null);

  if (!job) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Vaga não encontrada</h1>
        <Button onClick={() => navigate("/rh/vagas")}>← Voltar</Button>
      </div>
    );
  }

  const openScheduleModal = (candidateId: string, candidateName: string) => {
    setSelectedCandidate({ id: candidateId, nome: candidateName });
    setIsModalOpen(true);
  };

  const handleScheduleSubmit = (date: string, time: string, link: string) => {
    if (!selectedCandidate) return;

    const dateTime = `${date}T${time}`;
    const interview = {
      id: `int-${Date.now()}`,
      name: selectedCandidate.nome,
      date: dateTime,
      link,
      candidateId: selectedCandidate.id,
    };

    agendarEntrevista(job.id, interview);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Candidatos para a vaga: <span className="text-blue-600">{job.title}</span>
      </h1>

      {job.candidatos.length === 0 ? (
        <p className="text-gray-600">Nenhum candidato para esta vaga ainda.</p>
      ) : (
        <ul className="space-y-4">
          {job.candidatos.map((cand) => (
            <li
              key={cand.id}
              className="bg-white shadow p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{cand.nome}</h2>
                <p>Status: {cand.status}</p>
                <p>Avaliado: {cand.avaliado ? "Sim" : "Não"}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/rh/candidato/${cand.id}`)}
                >
                  Ver Perfil
                </Button>
                <Button
                  onClick={() => avaliarCandidato(job.id, cand.id)}
                  disabled={cand.avaliado}
                >
                  {cand.avaliado ? "✓ Avaliado" : "Avaliar"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => openScheduleModal(cand.id, cand.nome)}
                >
                  Agendar Entrevista
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ScheduleInterviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleScheduleSubmit}
        candidateName={selectedCandidate?.nome || ""}
      />
    </div>
  );
};
