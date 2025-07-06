import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Circle } from "lucide-react";

type Status = "concluido" | "activo" | "pendente";

type Etapa = {
  etapa: string;
  status: Status;
};

export type Candidatura = {
  id: string;
  vaga: string;
  empresa: string;
  dataCandidatura: string; // formato ISO: "2025-06-28T14:45"
  etapas: Etapa[];
};

interface TimelineCandidaturaProps {
  candidatura: Candidatura;
}

const statusStyles: Record<Status, string> = {
  concluido: "border-green-500 bg-green-50 text-green-700",
  activo: "border-yellow-500 bg-yellow-50 text-yellow-700",
  pendente: "border-gray-400 bg-gray-50 text-gray-700",
};

const statusIcon = {
  concluido: <CheckCircle size={20} className="text-green-500" />,
  activo: <Clock size={20} className="text-yellow-500" />,
  pendente: <Circle size={20} className="text-gray-400" />,
};

export const TimelineCandidatura: React.FC<TimelineCandidaturaProps> = ({ candidatura }) => {
  const totalEtapas = candidatura.etapas.length;
  const etapasConcluidas = candidatura.etapas.filter(e => e.status === "concluido").length;
  const progresso = Math.round((etapasConcluidas / totalEtapas) * 100);

  const dataFormatada = new Date(candidatura.dataCandidatura).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-blue-700">
          {candidatura.vaga}{" "}
          <span className="text-gray-500 text-sm">({candidatura.empresa})</span>
        </h3>
        <span className="text-sm text-gray-500 italic">
          Candidatado em {dataFormatada}
        </span>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {etapasConcluidas} de {totalEtapas} etapas concluídas ({progresso}%)
        </p>
      </div>

      {/* Timeline das Etapas */}
      <div className="space-y-4">
        {candidatura.etapas.map((etapa, i) => {
          const style = statusStyles[etapa.status];
          return (
            <div
              key={i}
              className={`flex items-center justify-between p-4 rounded-md border-l-4 ${style}`}
              role="group"
              aria-label={`Etapa ${etapa.etapa}, status: ${etapa.status}`}
            >
              <div className="flex items-center gap-2">
                {statusIcon[etapa.status]}
                <span className="font-medium">{etapa.etapa}</span>
              </div>

              {/* Ações por etapa */}
              {etapa.etapa === "Entrevista marcada" && etapa.status !== "pendente" && (
                <Link
                  to={`/candidato/entrevistas`}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Reagendar
                </Link>
              )}
              {etapa.etapa === "Feedback" && etapa.status === "concluido" && (
                <Link
                  to={`/feedback/${candidatura.id}`}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Ver Feedback
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-right">
        <Link
          to={`/vagas/${candidatura.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Ver detalhes da vaga →
        </Link>
      </div>
    </div>
  );
};
