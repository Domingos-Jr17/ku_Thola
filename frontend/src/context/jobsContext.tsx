import { createContext, useReducer, type ReactNode } from "react";

export interface Candidate {
  id: string;
  nome: string;
  status: string;
  avaliado: boolean;
}

export interface Interview {
  id: string;
  name: string;
  date: string;
  link?: string;
  candidateId: string;
}

export interface Job {
  candidateCount: number;
  local: ReactNode;
  descricao: ReactNode;
  dataCriacao: ReactNode;
  id: string;
  _id: string;
  title: string;
  department: string;
  type: "Presencial" | "Virtual";
  location: string;
  expirationDate: string;
  description: string;
  benefits: string;
  requirements: string[];
  status: "aberta" | "fechada" | "rascunho";
  candidatos: Candidate[];
  entrevistas: Interview[];
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  updateJob: (job: Job) => void;
  getJobById: (id: string | undefined) => Job | undefined;
  avaliarCandidato: (jobId: string, candidateId: string) => void;
  agendarEntrevista: (jobId: string, interview: Interview) => void;
  fecharCandidaturas: (jobId: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const JobContext = createContext<JobContextType | undefined>(undefined);

// Dados iniciais fictícios
const initialJobs: Job[] = [
  {
    id: "1",
    _id: "1",
    title: "Desenvolvedor Frontend",
    department: "Tecnologia",
    type: "Presencial",
    location: "Maputo",
    expirationDate: "2025-07-07",
    description: "Estamos à procura de um dev frontend com React e Tailwind.",
    requirements: ["React", "Tailwind", "HTML", "CSS"],
    status: "aberta",
    candidatos: [],
    entrevistas: [],
    local: undefined,
    descricao: undefined,
    dataCriacao: undefined,
    candidateCount: 7,
    benefits: ""
  },
  {
    id: "2",
    _id: "2",
    title: "Desenvolvedor Backend",
    department: "Tecnologia",
    type: "Presencial",
    location: "Maputo",
    expirationDate: "2025-07-01",
    description: "Precisamos de dev backend com Node.js e MongoDB.",
    requirements: ["Node.js", "MongoDB", "Express"],
    status: "fechada",
    candidatos: [],
    entrevistas: [],
    local: undefined,
    descricao: undefined,
    dataCriacao: undefined,
    candidateCount: 7,
    benefits: ""
  }
];

type JobAction =
  | { type: "ADD_JOB"; payload: Job }
  | { type: "DELETE_JOB"; payload: string }
  | { type: "UPDATE_JOB"; payload: Job }
  | { type: "AVALIAR_CANDIDATO"; payload: { jobId: string; candidateId: string } }
  | { type: "AGENDAR_ENTREVISTA"; payload: { jobId: string; interview: Interview } }
  | { type: "FECHAR_CANDIDATURAS"; payload: string };

// Reducer
const jobsReducer = (state: Job[], action: JobAction): Job[] => {
  switch (action.type) {
    case "ADD_JOB":
      return [...state, action.payload];

    case "DELETE_JOB":
      return state.filter((job) => job.id !== action.payload);

    case "UPDATE_JOB":
      return state.map((job) =>
        job.id === action.payload.id ? { ...job, ...action.payload } : job
      );

    case "AVALIAR_CANDIDATO":
      return state.map((job) =>
        job.id === action.payload.jobId
          ? {
              ...job,
              candidatos: job.candidatos.map((c) =>
                c.id === action.payload.candidateId
                  ? { ...c, avaliado: true, status: "Avaliado" }
                  : c
              )
            }
          : job
      );

    case "AGENDAR_ENTREVISTA":
      return state.map((job) =>
        job.id === action.payload.jobId
          ? { ...job, entrevistas: [...job.entrevistas, action.payload.interview] }
          : job
      );

    case "FECHAR_CANDIDATURAS":
      return state.map((job) =>
        job.id === action.payload ? { ...job, status: "fechada" } : job
      );

    default:
      return state;
  }
};

// Provider
export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, dispatch] = useReducer(jobsReducer, initialJobs);

  const addJob = (job: Job) => {
    const jobWithId: Job = {
      ...job,
      id: Date.now().toString(),
      _id: Date.now().toString(),
      status: "aberta",
      candidatos: [],
      entrevistas: []
    };
    dispatch({ type: "ADD_JOB", payload: jobWithId });
  };

  const updateJob = (job: Job) => {
    dispatch({ type: "UPDATE_JOB", payload: job });
  };

  const deleteJob = (id: string) => {
    dispatch({ type: "DELETE_JOB", payload: id });
  };

  const getJobById = (id?: string) => jobs.find((job) => job.id === id);

  const avaliarCandidato = (jobId: string, candidateId: string) => {
    dispatch({ type: "AVALIAR_CANDIDATO", payload: { jobId, candidateId } });
  };

  const agendarEntrevista = (jobId: string, interview: Interview) => {
    dispatch({ type: "AGENDAR_ENTREVISTA", payload: { jobId, interview } });
  };

  const fecharCandidaturas = (jobId: string) => {
    dispatch({ type: "FECHAR_CANDIDATURAS", payload: jobId });
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        deleteJob,
        updateJob,
        getJobById,
        avaliarCandidato,
        agendarEntrevista,
        fecharCandidaturas
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
