import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import  RHLayout  from "./layouts/rh/rhLayout";
import CandidateLayout from "./layouts/candidate/CandidateLayout";

// Páginas públicas
import { Home } from "./pages/home";
import { About } from "./pages/About";
import HelpFAQ from "./pages/candidate/Help";
import { LoginCandidate } from "./pages/candidate/LoginCandidate";
import { RegisterCandidate } from "./pages/candidate/RegisterCandidate";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";
import { ErrorPage } from "./pages/error-page";

// Páginas do candidato
import { JobsList } from "./pages/candidate/JobsList";
import { JobDetails } from "./pages/candidate/JobDetails";
import { ApplicationForm } from "./pages/candidate/ApplicationForm";
import { MyApplication } from "./pages/candidate/MyApplication";
import { CandidateProfile } from "./pages/candidate/CandidateProfile";
import { FinalFeedback } from "./pages/candidate/FinalFeedback";
import { CandidateDashboard } from "./pages/candidate/CandidateDashboard";
import { DashboardCandidaturas } from "./pages/candidate/DashboardCandidaturas";
import { DashboardEntrevistas } from "./pages/candidate/DashboardEntrevistas";
import { CandidateNotifications } from "./pages/candidate/candidateNotification";
import { InterviewFeedback } from "./pages/candidate/InterviewFeedback";

// Páginas do recrutador
import { RecruiterLogin } from "./pages/recruiter/RecruiterLogin";
import { RecruiterDashboard } from "./pages/recruiter/rh/RecruiterDashboard";
import { ManageJobs } from "./pages/recruiter/rh/ManageJobs";
import { CandidatesList } from "./pages/recruiter/rh/candidatesList";
import { CandidateEvaluation } from "./pages/recruiter/CandidateEvaluation";
import { EvaluationsList } from "./pages/recruiter/EvaluationsList";
import { CandidateInterview } from "./pages/recruiter/CandidateInterview";
import { CandidateCommunication } from "./pages/recruiter/CandidateCommunication";
import { CandidateNotificationsRh } from "./pages/recruiter/CandidateNotifications";
import { JobHistory } from "./pages/recruiter/JobHistory";
import JobMatching from "./pages/recruiter/JobMatching";
import { Messages } from "./pages/recruiter/Messages";
import { Reports } from "./pages/recruiter/Reports";
import { RecruiterProfile } from "./pages/recruiter/RecruiterProfile";
import { ScheduledInterviews } from "./pages/recruiter/ScheduledInterviews";
import JobDetailsPage from "./pages/recruiter/rh/JobDetailsPage1";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ajuda" element={<HelpFAQ />} />
        <Route path="/login" element={<LoginCandidate />} />
        <Route path="/registro" element={<RegisterCandidate />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos" element={<TermsOfUse />} />

        {/* 👤 Candidato - Rotas protegidas (com layout) */}
        <Route path="/candidato" element={<CandidateLayout />}>
          {/* Vagas */}
          <Route path="vagas" element={<JobsList />} />
          <Route path="vagas/:id" element={<JobDetails />} />
          <Route path="candidatar/:id" element={<ApplicationForm />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="minhas-candidaturas" element={<DashboardCandidaturas />} />
          <Route path="entrevistas" element={<DashboardEntrevistas />} />

          {/* Conta e comunicação */}
          <Route path="perfil" element={<CandidateProfile />} />
          <Route path="minha-candidatura" element={<MyApplication />} />
          <Route path="notificacoes" element={<CandidateNotifications />} />
          <Route path="feedback/:id" element={<InterviewFeedback />} />
        </Route>

        {/* 👨‍💼 Recrutador - Layout e sub-rotas */}
        <Route path="/rh/login" element={<RecruiterLogin />} />

        <Route path="/rh" element={<RHLayout />}>
          {/* Principais rotas */}
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="vagas" element={<ManageJobs />} />
          <Route path="candidatos" element={<CandidatesList />} />
          <Route path="avaliacoes" element={<EvaluationsList />} />
          <Route path="historico" element={<JobHistory />} />
          <Route path="entrevistas" element={<ScheduledInterviews />} />
          <Route path="vagas/:id" element={<JobDetailsPage />} />

          {/* Job Matching */}
          <Route path="job-matching/:id" element={<JobMatching />} />

          {/* Sub-rotas agrupadas do candidato */}
          <Route path="candidato/:id">
            <Route index element={<CandidateProfile />} />
            <Route path="avaliacao" element={<CandidateEvaluation />} />
            <Route path="feedback" element={<FinalFeedback />} />
            <Route path="entrevista" element={<CandidateInterview />} />
            <Route path="comunicacao" element={<CandidateCommunication />} />
            <Route path="notificacoes" element={<CandidateNotificationsRh />} />
          </Route>

          {/* Placeholders para páginas futuras */}
          <Route path="comunicacao" element={<Messages />} />
          <Route path="relatorios" element={<Reports />} />
          <Route path="perfil" element={<RecruiterProfile />} />
        </Route>

        {/* ❌ Página de erro (para rotas não encontradas) */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}
