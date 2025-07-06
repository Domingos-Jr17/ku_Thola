import React from "react";
import { InputGroup } from "@/components/ui/InputGroup";
import type { Job } from "@/context/jobsContext";

interface JobViewFormProps {
  job: Job;
}

export const JobViewForm: React.FC<JobViewFormProps> = ({ job }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Detalhes da Vaga</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Título" id="title" value={job.title} disabled />
        <InputGroup label="Departamento" id="department" value={job.department} disabled />
        
        <InputGroup label="Tipo" id="type" value={job.type} disabled />
        <InputGroup label="Data de Encerramento" id="expirationDate" value={job.expirationDate} disabled />
        <InputGroup label="Localização" id="location" value={job.location} disabled />

        <InputGroup
          label="Requisitos"
          id="requirements"
          value={job.requirements.join(", ")}
          textarea
          rows={2}
          disabled
        />

        <InputGroup
          label="Descrição"
          id="description"
          value={job.description}
          textarea
          rows={4}
          disabled
        />

        <InputGroup
          label="Benefícios"
          id="benefits"
          value={job.benefits}
          textarea
          rows={2}
          disabled
        />
      </div>
    </div>
  );
};
