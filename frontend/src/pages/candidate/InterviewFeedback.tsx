import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/headers";
import { Footer } from "@/components/layout/footer";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface FeedbackData {
  candidateName: string;
  message: string;
  status: "approved" | "rejected" | "interview" | "pending";
  feedbackDate: string;
}

const getMockFeedback = (id: string): FeedbackData | null => {
  const mockData: Record<string, FeedbackData> = {
    "1": {
      candidateName: "Domingos Timane",
      message: "Parabéns! Você demonstrou boa capacidade técnica e ótimo raciocínio lógico. Estamos avançando com sua contratação.",
      status: "approved",
      feedbackDate: "2025-06-26T10:00:00Z",
    },
    "2": {
      candidateName: "Angel Bila",
      message: "Agradecemos a sua participação, mas seguimos com outro perfil. Esperamos poder contar com você no futuro.",
      status: "rejected",
      feedbackDate: "2025-06-25T11:00:00Z",
    },
  };

  return mockData[id] || null;
};

export const InterviewFeedback = () => {
  const { id } = useParams<{ id: string }>();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Simula requisição
    setTimeout(() => {
      const data = getMockFeedback(id);
      setFeedback(data);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600" aria-live="polite">
        Carregando feedback...
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold" aria-live="polite">
        Feedback não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Feedback da Entrevista</h1>

        <section aria-labelledby="feedback-content" className="space-y-4">
          <p className="text-gray-700">
            <strong>Nome do Candidato:</strong> {feedback.candidateName}
          </p>

          <div>
            <strong>Status Final:</strong> <StatusBadge status={feedback.status} />
          </div>

          <div>
            <strong>Mensagem:</strong>
            <p className="mt-2 text-gray-800 border-l-4 border-blue-500 pl-4 italic">
              {feedback.message}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Recebido em:{" "}
            {new Date(feedback.feedbackDate).toLocaleString("pt-PT", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
