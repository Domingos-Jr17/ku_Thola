import { useState, useMemo } from "react";
import { TimelineCandidatura } from "@/components/ui/TimelineCandidatura";
import type { Candidatura } from "@/components/ui/TimelineCandidatura";
import { Button } from "@/components/ui/Button";

const candidaturasMock: Candidatura[] = [
  {
    id: "1",
    vaga: "Engenheiro Júnior",
    empresa: "Construtora Maputo",
    etapas: [
      { etapa: "Submetida", status: "concluido" },
      { etapa: "Em análise", status: "ativo" },
      { etapa: "Entrevista marcada", status: "pendente" },
      { etapa: "Feedback", status: "pendente" },
    ],
    dataCandidatura: "06/16/2025"
  },
  {
    id: "2",
    vaga: "Designer UX",
    empresa: "Agência Criativa",
    etapas: [
      { etapa: "Submetida", status: "concluido" },
      { etapa: "Em análise", status: "concluido" },
      { etapa: "Entrevista marcada", status: "ativo" },
      { etapa: "Feedback", status: "pendente" },
    ],
    dataCandidatura: "06/06/2025"
  },
];

const statusOptions = ["todos", "concluido", "ativo", "pendente"] as const;

export const DashboardCandidaturas = () => {
  const [filterStatus, setFilterStatus] = useState<typeof statusOptions[number]>("todos");
  const [orderDesc, setOrderDesc] = useState(true);

  const candidaturasFiltradas = useMemo(() => {
    if (filterStatus === "todos") return candidaturasMock;
    return candidaturasMock.filter((cand) =>
      cand.etapas.some((etapa) => etapa.status === filterStatus)
    );
  }, [filterStatus]);

  const candidaturasOrdenadas = useMemo(() => {
    return [...candidaturasFiltradas].sort((a, b) => {
      if (orderDesc) return b.vaga.localeCompare(a.vaga);
      return a.vaga.localeCompare(b.vaga);
    });
  }, [candidaturasFiltradas, orderDesc]);

  const formatStatus = (status: typeof statusOptions[number]) => {
    switch (status) {
      case "concluido": return "Concluído";
      case "ativo": return "Em Andamento";
      case "pendente": return "Pendente";
      case "todos": return "Todos";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">Minhas Candidaturas</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <label className="flex items-center gap-2">
          <span>Status:</span>
          <select
            className="border rounded px-3 py-1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof statusOptions[number])}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {formatStatus(status)}
              </option>
            ))}
          </select>
        </label>

        <Button
          onClick={() => setOrderDesc(!orderDesc)}
          variant="outline"
          aria-label="Alternar ordem de listagem"
        >
          Ordenar {orderDesc ? "Z → A" : "A → Z"}
        </Button>
      </div>

      {/* Resumo */}
      <p className="mb-4 text-gray-700">
        Total de candidaturas: <strong>{candidaturasFiltradas.length}</strong>
      </p>

      {/* Lista de candidaturas */}
      {candidaturasOrdenadas.length === 0 ? (
        <p className="text-gray-600 italic">
          Nenhuma candidatura encontrada para o filtro selecionado.
        </p>
      ) : (
        candidaturasOrdenadas.map((candidatura) => (
          <TimelineCandidatura key={candidatura.id} candidatura={candidatura} />
        ))
      )}
    </div>
  );
};
