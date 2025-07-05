// src/context/EvaluationContext.tsx
import React, { createContext, useState, type ReactNode, useEffect } from "react";

export interface Evaluation {
  id: string;
  candidateId: string;
  candidateName: string;
  email: string;
  jobId: string;
  status: "Aprovado" | "Não selecionado";
  technical: string;
  behavioral: string;
}

export interface EvaluationContextType {
  evaluations: Evaluation[];
  setEvaluations: React.Dispatch<React.SetStateAction<Evaluation[]>>;
  filterEvaluations: (search: string) => Evaluation[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider = ({ children }: { children: ReactNode }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  // Aqui você pode carregar avaliações da API ou localStorage
  useEffect(() => {
    // fetch / carregar avaliações mockadas
    setEvaluations([
      // ...insira os dados mockados aqui
    ]);
  }, []);

  const filterEvaluations = (search: string) => {
    if (!search) return evaluations;
    const lowerSearch = search.toLowerCase();
    return evaluations.filter(
      (evalItem) =>
        evalItem.candidateName.toLowerCase().includes(lowerSearch) ||
        evalItem.email.toLowerCase().includes(lowerSearch) ||
        evalItem.technical.toLowerCase().includes(lowerSearch) ||
        evalItem.behavioral.toLowerCase().includes(lowerSearch)
    );
  };

  return (
    <EvaluationContext.Provider value={{ evaluations, setEvaluations, filterEvaluations }}>
      {children}
    </EvaluationContext.Provider>
  );
};


