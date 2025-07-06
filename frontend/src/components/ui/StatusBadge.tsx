import React from "react";

export type BadgeStatus =
  | "approved"
  | "rejected"
  | "pending"
  | "interview"
  | "done"
  | "cancelled"
  | "unknown"
  | "aberta"
  | "fechada"
  | "rascunho";

interface StatusBadgeProps {
  status: BadgeStatus;
}

const statusConfig: Record<BadgeStatus, { style: string; label: string }> = {
  approved: { style: "bg-green-100 text-green-700", label: "Aprovado" },
  rejected: { style: "bg-red-100 text-red-700", label: "Rejeitado" },
  pending: { style: "bg-yellow-100 text-yellow-700", label: "Pendente" },
  interview: { style: "bg-blue-100 text-blue-700", label: "Entrevista" },
  done: { style: "bg-purple-100 text-purple-700", label: "Finalizado" },
  cancelled: { style: "bg-gray-200 text-gray-700", label: "Cancelado" },
  unknown: { style: "bg-gray-100 text-gray-600", label: "Desconhecido" },
  aberta: { style: "bg-green-100 text-green-700", label: "Aberta" },
  fechada: { style: "bg-red-100 text-red-700", label: "Fechada" },
  rascunho: { style: "bg-yellow-100 text-yellow-700", label: "Rascunho" },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { style, label } = statusConfig[status] ?? statusConfig.unknown;

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${style}`}
      aria-label={`Status: ${label}`}
      role="status"
    >
      {label}
    </span>
  );
};