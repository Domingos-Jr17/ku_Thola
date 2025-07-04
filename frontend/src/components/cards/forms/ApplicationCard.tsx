import React from "react";

type ApplicationProps = {
  jobId: string;
  jobTitle: string;
  status: string;
};

const statusColors: Record<string, string> = {
  Aprovado: "text-green-600 border-green-300 bg-green-50",
  Rejeitado: "text-red-600 border-red-300 bg-red-50",
  "Em análise": "text-yellow-600 border-yellow-300 bg-yellow-50",
  "Em entrevista": "text-blue-600 border-blue-300 bg-blue-50",
};

export const ApplicationCard: React.FC<{ application: ApplicationProps }> = ({
  application,
}) => {
  const statusColor = statusColors[application.status] || "text-gray-600 border-gray-300 bg-gray-50";

  return (
    <li
      className={`p-4 border rounded-md shadow-sm flex justify-between items-center ${statusColor}`}
      aria-label={`Candidatura para vaga ${application.jobTitle}, status: ${application.status}`}
    >
      <span className="font-semibold">{application.jobTitle}</span>
      <span className="italic">{application.status}</span>
    </li>
  );
};
