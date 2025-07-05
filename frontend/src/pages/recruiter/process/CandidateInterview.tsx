import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewModal } from "@/components/ui/InterviewModal";
import { useInterview } from "@/hooks/useInterview";

export const CandidateInterview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const { addInterview } = useInterview();

  const handleClose = () => {
    setIsModalOpen(false);
    navigate(`/rh/candidato/${id}`);
  };

  const handleConfirm = (data: { date: string; link: string; notes: string }) => {
    if (!id) return;

    // Aqui você pode complementar os dados do candidato se tiver acesso
    // ou buscar via contexto/estado global para preencher nome, email, etc.

    const newInterview = {
      id: `int-${Date.now()}`, // gera um id único simples
      candidateId: id,
      name: "",     // Ideal preencher com o nome do candidato
      email: "",    // Ideal preencher com email do candidato
      jobTitle: "", // Pode ser informado também
      method: undefined, // Se tiver o método da entrevista (presencial, online...)
      ...data,
    };

    addInterview(newInterview);

    setSubmitted(true);

    // Depois de 1.5s, volta para perfil do candidato
    setTimeout(() => {
      navigate(`/rh/candidato/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <InterviewModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />

      {submitted && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
          Entrevista agendada com sucesso!
        </div>
      )}
    </div>
  );
};
