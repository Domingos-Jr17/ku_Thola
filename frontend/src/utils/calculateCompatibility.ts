export const calculateCompatibility = (
  requirements: string[],
  skills: string[] = []
): number => {
  const matchCount = requirements.filter((req) =>
    skills.map(s => s.toLowerCase()).includes(req.toLowerCase())
  ).length;

  return Math.round((matchCount / requirements.length) * 100);
};
