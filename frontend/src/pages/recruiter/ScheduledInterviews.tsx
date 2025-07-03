// src/pages/recruiter/ScheduledInterviews.tsx
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface Interview {
  id: number;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  method: "Presencial" | "Zoom" | "Google Meet";
  status: "Confirmada" | "Pendente";
}

const mockInterviews: Interview[] = [
  {
    id: 1,
    candidateName: "Albertina Dlambe",
    jobTitle: "Desenvolvedor Frontend",
    date: "2025-07-05",
    time: "10:00",
    method: "Zoom",
    status: "Confirmada",
  },
  {
    id: 2,
    candidateName: "Domingos A. Timane Jr",
    jobTitle: "Desenvolvedor Frontend",
    date: "2025-07-06",
    time: "14:30",
    method: "Presencial",
    status: "Pendente",
  },
];

export const ScheduledInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);

  const handleCancel = (id: number) => {
    const updated = interviews.filter((int) => int.id !== id);
    setInterviews(updated);
  };

  const handleReschedule = () => {
    alert("Funcionalidade de reagendamento ainda será implementada.");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Entrevistas Agendadas</h1>

      {interviews.length === 0 ? (
        <p className="text-gray-600">Nenhuma entrevista agendada.</p>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white shadow-md p-4 rounded border-l-4 border-blue-600"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {interview.candidateName}
              </h2>
              <p className="text-sm text-gray-600">{interview.jobTitle}</p>
              <p className="text-sm mt-1">
                <strong>Data:</strong>{" "}
                {format(new Date(interview.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: pt,
                })}
              </p>
              <p className="text-sm">
                <strong>Hora:</strong> {interview.time}
              </p>
              <p className="text-sm">
                <strong>Via:</strong> {interview.method}
              </p>
              <p
                className={`text-sm font-medium mt-1 ${
                  interview.status === "Confirmada"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {interview.status}
              </p>

              <div className="mt-4 flex gap-2">
                <Button onClick={handleReschedule}>
                  Reagendar
                </Button>
                <Button
                  onClick={() => handleCancel(interview.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
