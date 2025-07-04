import { useJobContext } from "@/hooks/useJobContext";

export function useJobList() {
  const { jobs } = useJobContext();

  const normalizedJobs = jobs.map(job => ({
    ...job,
    status:
      job.status === "Aberta"
        ? "aberta"
        : job.status === "Fechada"
        ? "fechada"
        : (job.status as "aberta" | "fechada" | undefined),
  }));

  return { jobs: normalizedJobs };
}
