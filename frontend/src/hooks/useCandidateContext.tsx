import type { CandidateContextType } from "@/context/CandidateContext";
import { useContext } from "react";
import {CandidateContext} from "@/context/CandidateContext"


export const useCandidateContext = (): CandidateContextType => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidateContext must be used within a CandidateProvider");
  }
  return context;
};