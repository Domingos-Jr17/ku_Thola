import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes"; 
import { JobProvider } from "./context/jobsContext";
import { CandidateProvider } from "./context/CandidateContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <JobProvider>
      <CandidateProvider>
        <AppRoutes />
      </CandidateProvider>
    </JobProvider>
  </React.StrictMode>
);
