import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ScheduleInterviewModal } from "@/components/cards/forms/ScheduleInterviewModal";

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
  // Estados
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  // Filtros e paginação
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Todos" | "Confirmada" | "Pendente">("Todos");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  // Filtragem dos dados
  const filteredInterviews = useMemo(() => {
    return interviews.filter((int) => {
      const matchesName = int.candidateName.toLowerCase().includes(searchName.toLowerCase());
      const matchesStatus = statusFilter === "Todos" || int.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [interviews, searchName, statusFilter]);

  // Paginação
  const totalPages = Math.ceil(filteredInterviews.length / ITEMS_PER_PAGE);
  const paginatedInterviews = filteredInterviews.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Manipulação de paginação
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  // Ações
  const handleCancel = (id: number) => {
    if (window.confirm("Tem certeza que deseja cancelar esta entrevista?")) {
      setInterviews(interviews.filter((int) => int.id !== id));
    }
  };

  const handleOpenReschedule = (interview: Interview) => {
    setSelectedInterview(interview);
    setModalOpen(true);
  };

  const handleRescheduleConfirm = (
    date: string,
    time: string,
    method: "Presencial" | "Zoom" | "Google Meet"
  ) => {
    if (!selectedInterview) return;
    setInterviews((prev) =>
      prev.map((int) =>
        int.id === selectedInterview.id ? { ...int, date, time, method } : int
      )
    );
    setModalOpen(false);
    setSelectedInterview(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Entrevistas Agendadas</h1>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por candidato"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 flex-grow min-w-[200px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setStatusFilter(e.target.value as any);
            setPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="Todos">Todos</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Pendente">Pendente</option>
        </select>
      </div>

      {/* Lista */}
      {paginatedInterviews.length === 0 ? (
        <p className="text-gray-600">Nenhuma entrevista encontrada.</p>
      ) : (
        <div className="space-y-4">
          {paginatedInterviews.map((interview) => (
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
                <Button onClick={() => handleOpenReschedule(interview)}>
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

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Anterior
          </Button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            {page} / {totalPages}
          </span>
          <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Próximo
          </Button>
        </div>
      )}

      {/* Modal Reagendamento */}
     <ScheduleInterviewModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onSubmit={handleRescheduleConfirm}
  initialDate={selectedInterview?.date || ""}
  initialTime={selectedInterview?.time || ""}
  initialMethod={selectedInterview?.method || "Presencial"}
  candidateName={""}
/>
    </div>
  );
};
