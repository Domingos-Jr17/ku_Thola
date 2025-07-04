import React from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  candidate: {
    id: string;
    nome: string;
    status: string;
    avaliado: boolean;
  };
  onAvaliar: () => void;
  onAgendar: () => void;
}

export const CandidateCard: React.FC<Props> = ({ candidate, onAvaliar, onAgendar }) => {
  const navigate = useNavigate();

  return (
    <li className="bg-gray-50 p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{candidate.nome}</h3>
        <p>Status: {candidate.status}</p>
        <p>Avaliado: {candidate.avaliado ? "Sim" : "Não"}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate(`/rh/candidato/${candidate.id}`)}>
          Ver Perfil
        </Button>

        {candidate.avaliado ? (
          <Button variant="secondary" disabled>
            Avaliado ✓
          </Button>
        ) : (
          <Button variant="outline" onClick={onAvaliar}>
            Avaliar
          </Button>
        )}

        <Button onClick={onAgendar}>Agendar Entrevista</Button>
      </div>
    </li>
  );
};
