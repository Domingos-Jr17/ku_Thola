import React from "react";
import { useJobForm } from "@/hooks/useJobForm";
import { Button } from "@/components/ui/Button";
import { JobFormFields } from "./JobFormFields";
import { SlideOver } from "../ui/SlideOver";
import type { Job } from "@/context/jobsContext";

interface JobEditFormProps {
  job: Job;
  onClose: () => void;
  onSave: (updated: Job) => void;
}

export const JobEditForm: React.FC<JobEditFormProps> = ({ job, onClose, onSave }) => {
  const { form, handleChange, handleSubmit, loading } = useJobForm({
    mode: "edit",
    initialValues: job,
    onSuccess: () => {
      // O form já entrega os dados corretamente processados via useJobForm
      const updatedJob: Job = {
        ...job,
        ...form,
        requirements: form.requirements.split(",").map((req) => req.trim()).filter(Boolean),
      };

      onSave(updatedJob);
      onClose();
    },
  });

  return (
    <SlideOver isOpen={!!job} onClose={onClose} title="Editar Vaga">
      <form onSubmit={handleSubmit} className="space-y-6">
        <JobFormFields form={form} handleChange={handleChange} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </SlideOver>
  );
};
