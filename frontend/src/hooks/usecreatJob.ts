import { useState } from "react";
import { useJobContext } from "@/hooks/useJobContext";
import { toast } from "sonner";

export function useCreateJob(onSuccess?: () => void) {
  const { addJob } = useJobContext();

  const [form, setForm] = useState({
    title: "",
    department: "",
    type: "" as "Presencial" | "Virtual" | "",
    expirationDate: "",
    location: "",
    requirements: "",
    description: "",
    benefits: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "title", "department", "type", "expirationDate", "location", "requirements", "description"
    ];

    const missing = requiredFields.filter(field => !form[field as keyof typeof form]);

    if (missing.length > 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    const uuid = crypto.randomUUID();
    const { title, department, type, expirationDate, location, requirements, description } = form;

    const newJob = {
      id: uuid,
      _id: uuid,
      title,
      department,
      type: type as "Presencial" | "Virtual", // Type assertion
      expirationDate,
      location,
      local: location,
      description,
      descricao: description,
      requirements: requirements
        .split(",")
        .map(r => r.trim())
        .filter(Boolean),
      status: "Aberta" as const,
      candidatos: [],
      entrevistas: [],
      dataCriacao: new Date().toISOString(),
      candidateCount: 0
    };

    // Only add the job if type is valid
    if (type === "Presencial" || type === "Virtual") {
    addJob(newJob);
    toast.success("Vaga criada com sucesso!");

    setForm({
      title: "",
      department: "",
      type: "",
      expirationDate: "",
      location: "",
      requirements: "",
      description: "",
      benefits: ""
    });
    } else {
      toast.error("Por favor, selecione um tipo de vaga válido.");
    }

    setLoading(false);
    onSuccess?.();
  };

  return { form, handleChange, handleSubmit, loading };
}

