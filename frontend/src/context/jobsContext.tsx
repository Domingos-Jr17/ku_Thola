import React, { createContext, useContext, useState, type ReactNode } from "react";

interface Candidate {
  id: string;
  nome: string;
  status: string;
  avaliado: boolean;
  // Pode adicionar outros campos conforme necessário
}

interface Interview {
  id: string;
  name: string;
  date: string;
  link?: string;
  candidateId: string;
}

interface Job {
  id: string;
  title: string;
  status: string;
  descricao: string;
  dataCriacao: string;
  local: string;
  candidatos: Candidate[];
  entrevistas: Interview[];
}

interface JobContextType {
  jobs: Job[];
  getJobById: (id: string | undefined) => Job | undefined;
  avaliarCandidato: (jobId: string, candidateId: string) => void;
  agendarEntrevista: (jobId: string, interview: Interview) => void;
  fecharCandidaturas: (jobId: string) => void;
  deleteJob: (id: string) => void; // Adicione esta linha
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Desenvolvedor Frontend",
      status: "Ativa",
      descricao: "Estamos à procura de um desenvolvedor frontend com experiência em React e Tailwind.",
      dataCriacao: "2025-06-01",
      local: "Maputo",
      candidatos: [
        { id: "1", nome: "Albertina Dlambe", status: "Entrevista marcada", avaliado: true },
        { id: "2", nome: "Domingos A. Timane", status: "Em avaliação", avaliado: false }
      ],
      entrevistas: [
        { id: "int1", name: "Albertina Dlambe", date: "2025-07-01", link: "https://meet.example.com/abc", candidateId: "1" },
      ],
    },
    // Pode adicionar outras vagas
  ]);

  const getJobById = (id?: string) => jobs.find(job => job.id === id);

  const avaliarCandidato = (jobId: string, candidateId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job => {
        if (job.id !== jobId) return job;

        const candidatosAtualizados = job.candidatos.map(c => {
          if (c.id === candidateId) {
            return { ...c, avaliado: true, status: "Avaliado" };
          }
          return c;
        });

        return { ...job, candidatos: candidatosAtualizados };
      })
    );
  };

  const agendarEntrevista = (jobId: string, interview: Interview) => {
    setJobs(prevJobs =>
      prevJobs.map(job => {
        if (job.id !== jobId) return job;

        return { ...job, entrevistas: [...job.entrevistas, interview] };
      })
    );
  };

  const fecharCandidaturas = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job => {
        if (job.id !== jobId) return job;
        return { ...job, status: "Fechada" };
      })
    );
  };

  const deleteJob = (id: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        getJobById,
        avaliarCandidato,
        agendarEntrevista,
        fecharCandidaturas,
        deleteJob, // Adicione aqui também
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobContext must be used within a JobProvider");
  return context;
};
