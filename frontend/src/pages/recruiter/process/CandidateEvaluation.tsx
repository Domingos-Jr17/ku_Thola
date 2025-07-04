import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackModal } from '@/components/ui/FeedbackModal';
import { EvaluationForm } from '@/components/cards/forms/EvaluationForm';

interface EvaluationData {
  technical: number;
  communication: number;
  culture: number;
  comments: string;
}


export const CandidateEvaluation = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState(false);

const handleSubmit = (data: EvaluationData) => {
  // Enviar para API ou contexto aqui
  console.log('Dados de avaliação:', data);

  // TODO: salvar no contexto ou API
  // ex: avaliarCandidatoDetalhado(id, data)

  setModalOpen(true);
};

  const confirmAndNavigate = () => {
    setModalOpen(false);
    if (id) navigate(`/rh/candidato/${id}/feedback`);
  };

  return (
    <div className="min-h-screen flex flex-col">
    
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
          <button
            type="button"
            onClick={() => id && navigate(`/rh/candidato/${id}`)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Voltar para perfil do candidato
          </button>

          <h1 className="text-2xl font-semibold mb-6">Avaliação do Candidato</h1>

         <EvaluationForm onSubmit={(data) => handleSubmit(data)} />

        </div>
      </main>
     

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitFeedback={confirmAndNavigate}
      />
    </div>
  );
};
