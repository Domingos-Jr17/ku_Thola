
import { createContext, useContext, useState, type ReactNode } from "react";

export interface Interview {
  method: ReactNode;
  id: string; // id do candidato
  name: string;
  email: string;
  jobTitle: string;
  date: string;
  link: string;
  notes: string;
  candidateId: string;
}

interface InterviewContextType {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updated: Partial<Interview>) => void;
  removeInterview: (id: string) => void;
  getInterviewById: (id: string) => Interview | undefined;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);

  const addInterview = (interview: Interview) => {
    setInterviews((prev) => [...prev, interview]);
  };

  const updateInterview = (id: string, updated: Partial<Interview>) => {
    setInterviews((prev) =>
      prev.map((int) => (int.id === id ? { ...int, ...updated } : int))
    );
  };

  const removeInterview = (id: string) => {
    setInterviews((prev) => prev.filter((int) => int.id !== id));
  };

  const getInterviewById = (id: string) => {
    return interviews.find((int) => int.id === id);
  };

  return (
    <InterviewContext.Provider
      value={{ interviews, addInterview, updateInterview, removeInterview, getInterviewById }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview deve ser usado dentro do InterviewProvider");
  }
  return context;
};
