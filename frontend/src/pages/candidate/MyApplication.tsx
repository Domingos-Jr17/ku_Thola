import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface StageStatus {
  stage: string;
  completed: boolean;
}

interface ApplicationDetails {
  name: string;
  email: string;
  phone: string;
  interest: string;
  coverLetter: string;
  cvUrl: string;
  jobTitle: string;
  submissionDate: string;
  statusTimeline: StageStatus[];
}

export const MyApplication = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const justSubmitted = queryParams.get("submitted") === "true";

  const [showSuccessBanner, setShowSuccessBanner] = useState(justSubmitted);
  const [application, setApplication] = useState<ApplicationDetails | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // 🔄 Substitua com a chamada real da sua API
        const response = await fetch(`/api/candidaturas/${id}`);
        const data = await response.json();
        setApplication(data);
      } catch (error) {
        console.error("Erro ao buscar candidatura:", error);

        // Fallback simulado
        setApplication({
          name: "Domingos Timane",
          email: "domingos@email.com",
          phone: "+258 84 000 0000",
          interest: "Desenvolvimento Frontend",
          coverLetter: "Sou apaixonado por resolver problemas usando tecnologia...",
          cvUrl: "https://example.com/cv.pdf",
          jobTitle: "Desenvolvedor Web",
          submissionDate: new Date().toISOString(),
          statusTimeline: [
            { stage: "Recebido", completed: true },
            { stage: "Em Avaliação", completed: false },
            { stage: "Entrevista", completed: false },
            { stage: "Resultado", completed: false },
          ],
        });
      }

      if (justSubmitted) {
        const timer = setTimeout(() => setShowSuccessBanner(false), 6000);
        return () => clearTimeout(timer);
      }
    };

    fetchApplication();
  }, [id, justSubmitted]);

  const progressPercent =
    (application?.statusTimeline?.filter((s) => s.completed).length || 0) /
    (application?.statusTimeline?.length || 1) *
    100;

  const currentStatus =
    application?.statusTimeline.find((s) => !s.completed) ||
    application?.statusTimeline[application.statusTimeline.length - 1];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black bg-[url('/img/fundo-2.jpg')] p-6 bg-cover bg-center">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary-700">Minha Candidatura</h1>

        {showSuccessBanner && application && (
          <div className="mb-6 p-4 bg-green-100 text-green-900 rounded border border-green-300" role="alert">
            <p className="font-semibold mb-1">✅ Sua candidatura foi enviada com sucesso!</p>
            <p>
              Você se candidatou para o cargo de <strong>{application.jobTitle}</strong> em{" "}
              {new Date(application.submissionDate).toLocaleString("pt-PT")}
            </p>
            <p className="mt-2">Nossa equipe vai analisar seu perfil e entraremos em contato em até 10 dias úteis.</p>
          </div>
        )}

        {application && (
          <>
            <ProgressBar progress={progressPercent} />

            <section className="mt-8 space-y-3 text-gray-700">
              <h2 className="text-xl font-semibold text-gray-900">
                Status atual:{" "}
                <span className="text-primary-600">{currentStatus?.stage}</span>
              </h2>

              <p>
                {currentStatus?.completed
                  ? "Obrigado por sua candidatura!"
                  : "Estamos avaliando sua candidatura."}
              </p>

              {currentStatus?.stage === "Entrevista" && currentStatus?.completed && (
                <p className="font-medium text-gray-900">
                  Data da entrevista:{" "}
                  <time dateTime="2025-10-15T10:00:00">15 de Outubro, 10:00 AM</time>
                </p>
              )}
            </section>

            <section className="mt-10 text-gray-800">
              <h2 className="text-xl font-semibold mb-2">Resumo da candidatura</h2>
              <ul className="space-y-1 text-sm">
                <li><strong>Nome:</strong> {application.name}</li>
                <li><strong>Email:</strong> {application.email}</li>
                <li><strong>Telefone:</strong> {application.phone}</li>
                <li><strong>Área de Interesse:</strong> {application.interest}</li>
                <li>
                  <strong>CV:</strong>{" "}
                  <a href={application.cvUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                    Visualizar CV
                  </a>
                </li>
                <li>
                  <strong>Carta de Apresentação:</strong>
                  <div className="mt-1 bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap">
                    {application.coverLetter}
                  </div>
                </li>
              </ul>
            </section>
          </>
        )}

        <div className="flex gap-4 pt-10">
          <button
            type="button"
            onClick={() => navigate("/candidato/dashboard")}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Voltar ao Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("/candidato/minhas-candidaturas")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg"
          >
            Ver Todas Candidaturas
          </button>
        </div>
      </div>
    </main>
  );
};
