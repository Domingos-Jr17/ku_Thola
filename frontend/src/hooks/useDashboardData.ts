// src/modules/recruiter/dashboard/useDashboardData.ts

export function useDashboardData() {
  // Mock temporário - pode ser substituído por Firebase futuramente
  return {
    jobs: {
      total: 12,
      open: 7,
      closed: 5,
    },
    candidates: {
      total: 48,
      interviews: 5,
      evaluations: 3,
    },
    communication: {
      messages: 4,
      notifications: 2,
    },
  };
}
