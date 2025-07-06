import { useJobContext } from "@/hooks/useJobContext";

export function useJobList() {
  const context = useJobContext();

  if (!context) {
    throw new Error("useJobList deve ser usado dentro de JobProvider");
  }

  const { jobs, deleteJob, updateJob } = context;

  const normalizedJobs = jobs.map((job) => ({
    ...job,
    status: normalizeStatus(job.status),
  }));

  const removeJob = (id: string) => {
    deleteJob(id);
  };

  return {
    jobs: normalizedJobs,
    removeJob,
    updateJob,
  };
}

// Função utilitária para normalizar o status
function normalizeStatus(status: string): "aberta" | "fechada" | "rascunho" {
  const s = status.toLowerCase();
  if (s === "aberta") return "aberta";
  if (s === "fechada") return "fechada";
  if (s === "rascunho") return "rascunho";
  return "rascunho"; // fallback seguro
}
