import { type InterviewContextType, InterviewContext } from "@/context/InterviewContext";
import { useContext } from "react";


export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview deve ser usado dentro do InterviewProvider");
  }
  return context;
};