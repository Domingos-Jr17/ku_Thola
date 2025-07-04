import { useState } from "react";
import { Button } from "@/components/ui/Button";

export const RecruiterProfile = () => {
  const [name, setName] = useState("Recrutador Exemplo");
  const [email, setEmail] = useState("recrutador@empresa.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Perfil atualizado (simulação).");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nova Senha</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};
