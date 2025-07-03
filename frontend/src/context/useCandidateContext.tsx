import { createContext, useContext, useState, type ReactNode } from "react";

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  resumeLink: string;
  notes: string;
  feedbacks?: { date: string; comment: string }[];
};

const CandidateContext = createContext<{
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (id: string, data: Partial<Candidate>) => void;
  removeCandidate: (id: string) => void;
} | undefined>(undefined);

export const CandidateProvider = ({ children }: { children: ReactNode }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Albertina Dlambe",
      email: "dlambealbertina@gmail.com",
      phone: "871522004 / 850221504",
      jobTitle: "Desenvolvedor Frontend",
      resumeLink: "https://example.com/cv-albertina.pdf",
      notes: "Candidata com boa comunicação e portfólio completo.",
      feedbacks: [],
    },
  ]);

  const addCandidate = (candidate: Candidate) => setCandidates(prev => [...prev, candidate]);

  const updateCandidate = (id: string, data: Partial<Candidate>) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, ...data } : c))
    );
  };

  const removeCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate, updateCandidate, removeCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCandidateContext = () => {
  const ctx = useContext(CandidateContext);
  if (!ctx) throw new Error("useCandidateContext must be used within a CandidateProvider");
  return ctx;
};
