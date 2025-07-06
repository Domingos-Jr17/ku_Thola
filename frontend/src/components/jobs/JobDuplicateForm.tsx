import React from "react";
import { useJobForm } from "@/hooks/useJobForm";
import { Button } from "@/components/ui/Button";
import { JobFormFields } from "./JobFormFields";
import { SlideOver } from "../ui/SlideOver";
import type { Job } from "@/context/jobsContext";

interface JobDuplicateFormProps {
  originalJob: Job;
  onDuplicated?: () => void;
  onClose: () => void;
}

export const JobDuplicateForm: React.FC<JobDuplicateFormProps> = ({
  originalJob,
  onDuplicated,
  onClose,
}) => {
  const { form, handleChange, handleSubmit, loading } = useJobForm({
    mode: "duplicate", // 👈 Corrigido: usar o modo "duplicate", não "create"
    initialValues: originalJob,
    onSuccess: () => {
      onDuplicated?.();
      onClose();
    },
  });

  return (
    <SlideOver isOpen={!!originalJob} onClose={onClose} title="Duplicar Vaga">
      <form onSubmit={handleSubmit} className="space-y-6">
        <JobFormFields form={form} handleChange={handleChange} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando cópia..." : "Criar Cópia da Vaga"}
          </Button>
        </div>
      </form>
    </SlideOver>
  );
};
