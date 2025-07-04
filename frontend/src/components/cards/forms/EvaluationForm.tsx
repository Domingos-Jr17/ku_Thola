import React, { useState } from "react";
import { InputGroup } from "@/components/ui/InputGroup";
import { Button } from "@/components/ui/Button";

type EvaluationData = {
  technical: number;
  communication: number;
  culture: number;
  comments: string;
};

interface EvaluationFormProps {
  onSubmit: (data: EvaluationData) => void;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ onSubmit }) => {
  const [technical, setTechnical] = useState("");
  const [communication, setCommunication] = useState("");
  const [culture, setCulture] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

const handleNumberChange = (setter: (v: string) => void) => (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const value = e.target.value;
  if (
    value === "" ||
    (/^\d{1,2}$/.test(value) && Number(value) >= 0 && Number(value) <= 10)
  ) {
    setter(value);
  }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (technical === "" || communication === "" || culture === "") {
      setError("Por favor, preencha todas as notas de avaliação.");
      return;
    }

    setError("");

    onSubmit({
      technical: Number(technical),
      communication: Number(communication),
      culture: Number(culture),
      comments,
    });

    // Resetar campos após envio
    setTechnical("");
    setCommunication("");
    setCulture("");
    setComments("");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <InputGroup
        label="Habilidades Técnicas (0 a 10)"
        id="technical"
        type="number"
        min={0}
        max={10}
        required
        value={technical}
        onChange={handleNumberChange(setTechnical)}
      />

      <InputGroup
        label="Comunicação (0 a 10)"
        id="communication"
        type="number"
        min={0}
        max={10}
        required
        value={communication}
        onChange={handleNumberChange(setCommunication)}
      />

      <InputGroup
        label="Aptidão Cultural (0 a 10)"
        id="culture"
        type="number"
        min={0}
        max={10}
        required
        value={culture}
        onChange={handleNumberChange(setCulture)}
      />

      <InputGroup
        label="Comentários Adicionais"
        id="comments"
        textarea
        rows={4}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={technical === "" || communication === "" || culture === ""}
        >
          Salvar Avaliação
        </Button>
      </div>
    </form>
  );
};
