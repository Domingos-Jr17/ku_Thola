import { useState } from "react";
import { toast } from "sonner";
import { useJobContext } from "@/hooks/useJobContext";

export function useJobDetails(jobId: string | undefined) {
  const { getJobById, avaliarCandidato, agendarEntrevista, fecharCandidaturas } = useJobContext();

  const job = getJobById(jobId);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{ id: string; nome: string } | null>(null);

  const handleFecharCandidaturas = () => {
    if (!job) return;
    fecharCandidaturas(job.id);
    toast.success("Candidaturas fechadas com sucesso!");
  };

  const handleAvaliar = (candidateId: string) => {
    if (!job) return;
    avaliarCandidato(job.id, candidateId);
    toast.success("Candidato avaliado com sucesso!");
  };

  const openScheduleModal = (id: string, nome: string) => {
    setSelectedCandidate({ id, nome });
    setModalOpen(true);
  };

  const handleScheduleSubmit = (date: string, time: string, link: string) => {
    if (!job || !selectedCandidate) return;
    const dateTime = `${date}T${time}`;
    const newInterview = {
      id: `int${Date.now()}`,
      name: selectedCandidate.nome,
      date: dateTime,
      link,
      candidateId: selectedCandidate.id,
    };
    agendarEntrevista(job.id, newInterview);
    toast.success("Entrevista agendada com sucesso!");
    setModalOpen(false);
  };

  return {
    job,
    modalOpen,
    selectedCandidate,
    setModalOpen,
    openScheduleModal,
    handleAvaliar,
    handleFecharCandidaturas,
    handleScheduleSubmit,
  };
}
