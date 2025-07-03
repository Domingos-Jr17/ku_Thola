import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const SummaryCard = ({
  title,
  value,
  color = "text-blue-600",
  onClick,
}: {
  title: string;
  value: number | string;
  color?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`bg-white shadow rounded-lg p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow`}
  >
    <h2 className={`text-lg sm:text-xl font-semibold ${color}`}>{title}</h2>
    <p className="mt-2 text-2xl sm:text-3xl font-bold">{value}</p>
  </div>
);

export const RecruiterDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Dados simulados
  const totalJobs = 12;
  const openJobs = 7;
  const closedJobs = 5;

  const totalCandidates = 48;
  const interviewsScheduled = 5;
  const pendingEvaluations = 3;

  const unreadMessages = 4;
  const pendingNotifications = 2;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-4 sm:p-8 w-full max-w-7xl mx-auto">
        <Button variant="outline" onClick={() => navigate("/")}>
          ← Voltar ao Home
        </Button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-6">
          Dashboard do Recrutador
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie suas vagas e acompanhe o progresso dos candidatos.
        </p>

        {/* Resumo - Gerir Vagas */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Gerir Vagas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <SummaryCard
              title="Total de Vagas"
              value={totalJobs}
              color="text-blue-600"
              onClick={() => navigate("/rh/vagas")}
            />
            <SummaryCard
              title="Vagas Abertas"
              value={openJobs}
              color="text-green-600"
              onClick={() => navigate("/rh/vagas?status=abertas")}
            />
            <SummaryCard
              title="Vagas Fechadas"
              value={closedJobs}
              color="text-red-600"
              onClick={() => navigate("/rh/vagas?status=fechadas")}
            />
          </div>
        </section>

        {/* Resumo - Processos Seletivos */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Processos Seletivos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <SummaryCard
              title="Candidatos"
              value={totalCandidates}
              color="text-purple-600"
              onClick={() => navigate("/rh/candidatos")}
            />
            <SummaryCard
              title="Entrevistas Agendadas"
              value={interviewsScheduled}
              color="text-yellow-600"
              onClick={() => navigate("/rh/entrevistas")}
            />
            <SummaryCard
              title="Avaliações Pendentes"
              value={pendingEvaluations}
              color="text-orange-600"
              onClick={() => navigate("/rh/avaliacoes")}
            />
          </div>
        </section>

        {/* Resumo - Comunicação */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Comunicação
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-sm">
            <SummaryCard
              title="Mensagens Não Lidas"
              value={unreadMessages}
              color="text-teal-600"
              onClick={() => navigate("/rh/comunicacao")}
            />
            <SummaryCard
              title="Notificações Pendentes"
              value={pendingNotifications}
              color="text-pink-600"
              onClick={() => navigate("/rh/notificacoes")}
            />
          </div>
        </section>

        {/* Ações rápidas */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Ações Rápidas
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap max-w-xl">
            <Button onClick={() => navigate("/rh/vagas/criar")}>
              Criar Nova Vaga
            </Button>
            <Button onClick={() => navigate("/rh/vagas")}>Ver Vagas</Button>
            <Button onClick={() => navigate("/rh/candidatos")}>Ver Candidatos</Button>
            <Button onClick={() => navigate("/rh/avaliacoes")}>Ver Avaliações</Button>
            <Button onClick={() => navigate("/rh/entrevistas")}>Ver Entrevistas</Button>
            <Button onClick={() => navigate("/rh/comunicacao")}>Mensagens</Button>
          </div>
        </section>
      </main>
    </div>
  );
};
