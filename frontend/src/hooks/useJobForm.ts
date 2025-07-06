/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import { useJobContext } from "@/hooks/useJobContext";
import type { Job } from "@/context/jobsContext";

export type Mode = "create" | "edit" | "duplicate";

export interface JobFormState {
  title: string;
  department: string;
  type: "Presencial" | "Virtual";
  expirationDate: string;
  location: string;
  requirements: string;
  description: string;
  benefits: string;
}

// Função utilitária para validar e forçar o tipo correto
function toJobStatus(value: string | undefined): "aberta" | "fechada" | "rascunho" {
  const lowered = value?.toLowerCase();
  if (lowered === "aberta" || lowered === "fechada" || lowered === "rascunho") {
    return lowered;
  }
  return "aberta"; // fallback
}

interface UseJobFormOptions {
  mode: Mode;
  initialValues?: Partial<Job>;
  onSuccess?: () => void;
}

const isEmpty = (value: string | undefined) => !value || value.trim().length === 0;

export const useJobForm = ({ mode, initialValues = {}, onSuccess }: UseJobFormOptions) => {
  const { addJob, updateJob } = useJobContext();

  // Processar valores iniciais, especialmente no modo "duplicate"
  const processedInitialValues: Partial<Job> = {
    ...initialValues,
    ...(mode === "duplicate"
      ? {
          id: undefined,
          _id: undefined,
          status: "aberta",
          candidatos: [],
          entrevistas: [],
          dataCriacao: new Date().toISOString(),
          candidateCount: 0,
        }
      : {}),
  };

  const [form, setForm] = useState<JobFormState>({
    title: processedInitialValues.title || "",
    department: processedInitialValues.department || "",
    type: processedInitialValues.type || "Presencial",
    expirationDate: processedInitialValues.expirationDate || "",
    location: processedInitialValues.location || "",
    requirements: processedInitialValues.requirements?.join(", ") || "",
    description: processedInitialValues.description || "",
    benefits: processedInitialValues.benefits || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof JobFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validateFields = (): boolean => {
    const requiredFields: (keyof JobFormState)[] = [
      "title",
      "department",
      "type",
      "expirationDate",
      "location",
      "requirements",
      "description",
    ];

    const missing = requiredFields.filter((field) => isEmpty(form[field]));
    if (missing.length > 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const buildJobObject = (): Job => {
    return {
      id: processedInitialValues.id || crypto.randomUUID(),
      _id: processedInitialValues._id || crypto.randomUUID(),
      title: form.title,
      department: form.department,
      type: form.type,
      expirationDate: form.expirationDate,
      location: form.location,
      requirements: form.requirements.split(",").map((r) => r.trim()),
      description: form.description,
      benefits: form.benefits,
      descricao: form.description,
      local: form.location,
      status:
        mode === "duplicate"
          ? "aberta"
          : toJobStatus(processedInitialValues.status || "aberta"),
      candidatos: processedInitialValues.candidatos || [],
      entrevistas: processedInitialValues.entrevistas || [],
      dataCriacao: processedInitialValues.dataCriacao || new Date().toISOString(),
      candidateCount: processedInitialValues.candidateCount || 0,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);

    try {
      const job = buildJobObject();

      if (mode === "edit") {
        updateJob(job);
        toast.success("Vaga atualizada com sucesso!");
      } else {
        addJob(job);
        toast.success(mode === "duplicate" ? "Vaga duplicada com sucesso!" : "Vaga criada com sucesso!");
      }

      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao processar os dados da vaga.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
  };
};
