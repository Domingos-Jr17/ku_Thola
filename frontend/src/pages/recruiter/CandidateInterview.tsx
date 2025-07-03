import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewModal } from "@/components/ui/InterviewModal";
import { useInterview } from "@/context/InterviewContext";

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

    // Adiciona a entrevista no contexto global
    addInterview({
        candidateId: id,
        ...data,
        id: "",
        name: "",
        email: "",
        jobTitle: "",
        method: undefined
    });

    setSubmitted(true);

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
