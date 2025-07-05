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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: EvaluationData) => {
    setLoading(true);
    setError(null);
    try {
      // Simule envio para API ou contexto
      // await avaliarCandidatoDetalhado(id, data);
      console.log('Dados de avaliação:', data);

      setModalOpen(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Falha ao salvar avaliação. Tente novamente.');
    } finally {
      setLoading(false);
    }
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

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <EvaluationForm onSubmit={handleSubmit} />

          {loading && <p className="mt-4 text-gray-600">Enviando avaliação...</p>}
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
