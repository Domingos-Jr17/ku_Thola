import { JobFormFields } from "./JobFormFields";
import { Button } from "@/components/ui/Button";
import { useJobForm } from "@/hooks/useJobForm";

export const JobCreateForm = ({ onCreated }: { onCreated?: () => void }) => {
  const { form, handleChange, handleSubmit, loading } = useJobForm({ mode: "create", onSuccess: onCreated });

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Criar Vaga</h2>
      <JobFormFields form={form} handleChange={handleChange} />
      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Vaga"}
        </Button>
      </div>
    </form>
  );
};
