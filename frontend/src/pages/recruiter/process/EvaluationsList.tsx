import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEvaluationContext } from "@/hooks/useEvaluationContext";
import { useJobContext } from "@/hooks/useJobContext";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const EvaluationsList = () => {
  const navigate = useNavigate();
  const { evaluations, filterEvaluations } = useEvaluationContext();
  const { jobs } = useJobContext();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = useMemo(() => filterEvaluations(search), [search, evaluations]);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [page, filtered]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j._id === jobId);
    return job ? job.title : "Vaga desconhecida";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Avaliações</h1>

      <input
        type="text"
        placeholder="Buscar candidato, email ou avaliação..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        aria-label="Buscar avaliações"
      />

      <table className="min-w-full table-auto bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Candidato</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Vaga</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Técnica</th>
            <th className="px-4 py-2">Comportamental</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-600">
                Nenhuma avaliação encontrada.
              </td>
            </tr>
          ) : (
            paginated.map((evalItem) => (
              <tr
                key={evalItem.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/rh/candidato/${evalItem.candidateId}`)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/rh/candidato/${evalItem.candidateId}`);
                }}
              >
                <td className="px-4 py-2 font-medium text-gray-800">{evalItem.candidateName}</td>
                <td className="px-4 py-2 text-blue-600 underline">{evalItem.email}</td>
                <td className="px-4 py-2">{getJobTitle(evalItem.jobId)}</td>
                <td className="px-4 py-2">
                  <StatusBadge
                    status={evalItem.status === "Aprovado" ? "approved" : "rejected"}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{evalItem.technical}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{evalItem.behavioral}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          aria-label="Página anterior"
        >
          ‹
        </button>

        <span className="px-3 py-1 border rounded bg-gray-100">
          Página {page} de {totalPages}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>
    </div>
  );
};
