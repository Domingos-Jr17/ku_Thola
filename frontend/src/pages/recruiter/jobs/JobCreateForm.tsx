import React from "react";
import { InputGroup } from "@/components/ui/InputGroup";
import { Button } from "@/components/ui/Button";
import { useCreateJob } from "@/hooks/usecreatJob";

interface JobCreateFormProps {
  onCreated?: () => void;
}

export const JobCreateForm: React.FC<JobCreateFormProps> = ({ onCreated }) => {
  const { form, handleChange, handleSubmit, loading } = useCreateJob(onCreated);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Criar nova vaga</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Título da vaga" id="title" value={form.title} onChange={handleChange("title")} required />
          <InputGroup label="Departamento" id="department" value={form.department} onChange={handleChange("department")}/>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-800 mb-1">
              Tipo
            </label>
            <select
              id="type"
              value={form.type}
              onChange={handleChange("type")}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">Selecione</option>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>

          <InputGroup label="Data de Encerramento" id="expirationDate" type="date" value={form.expirationDate} onChange={handleChange("expirationDate")} required />
          <InputGroup label="Localização" id="location" value={form.location} onChange={handleChange("location")} required />

          <InputGroup
            label="Requisitos (separados por vírgula)"
            id="requirements"
            value={form.requirements}
            onChange={handleChange("requirements")}
            required
            textarea
            rows={2}
          />

          <InputGroup
            label="Descrição da vaga"
            id="description"
            value={form.description}
            onChange={handleChange("description")}
            required
            textarea
            rows={4}
          />

          <InputGroup
            label="Benefícios (opcional)"
            id="benefits"
            value={form.benefits}
            onChange={handleChange("benefits")}
            textarea
            rows={2}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar Vaga"}
          </Button>
        </div>
      </form>
    </div>
  );
};
