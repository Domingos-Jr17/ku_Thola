import { EvaluationContext } from "@/context/EvaluationContext";
import { useContext } from "react";

export const useEvaluationContext = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error("useEvaluationContext must be used within EvaluationProvider");
  }
  return context;
};