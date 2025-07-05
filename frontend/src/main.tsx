import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes/routes"; 
import { JobProvider } from "./context/jobsContext";
import { CandidateProvider } from "./context/CandidateContext";
import "./index.css";
import { EvaluationProvider } from "./context/EvaluationContext";
import { AuthProvider } from "./context/AuthContext2";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AuthProvider>
    <JobProvider>
      <CandidateProvider>
        <EvaluationProvider>
        <AppRoutes />
        </EvaluationProvider>
      </CandidateProvider>
    </JobProvider>
    </AuthProvider>
  </React.StrictMode>
);
