import type { Job } from "@/context/jobsContext";

export const getExpiredJobs = (jobs: Job[]) => {
  const now = new Date();
  return jobs.filter(job => {
    if (!job.expirationDate) return false;
    const expiration = new Date(job.expirationDate);
    return expiration < now;
  });
};
