import { useState } from "react";

import { InputGroup } from "@/components/ui/InputGroup";
import { Button } from "@/components/ui/Button";

export const CandidateCommunication = () => {
  const [mensagem, setMensagem] = useState("");
  const [email, setEmail] = useState("");
  const [via, setVia] = useState("email");
  const [statusEnvio, setStatusEnvio] = useState("");

  const handleEnviar = () => {
    if (!mensagem || !email) {
      setStatusEnvio("Preencha todos os campos.");
      return;
    }

    // Mock de envio
    setTimeout(() => {
      setStatusEnvio(`Mensagem enviada via ${via.toUpperCase()} para ${email}`);
      setMensagem("");
      setEmail("");
    }, 1000);
  };

  return (
    <div>
   
      <main className="max-w-2xl mx-auto p-6 bg-white mt-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Comunicação com o Candidato</h1>

        <div className="space-y-4">
          <InputGroup
            label="Email ou Número do Candidato"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: candidato@email.com ou 82xxxxxxx"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Via de envio:</label>
          <select
            value={via}
            onChange={(e) => setVia(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </select>

          <InputGroup
            label="Mensagem"
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva sua mensagem aqui"
            textarea
            rows={5}
            required
          />

          <div className="flex justify-end">
            <Button onClick={handleEnviar}>Enviar Mensagem</Button>
          </div>

          {statusEnvio && (
            <p className="text-sm text-green-600 mt-2">{statusEnvio}</p>
          )}
        </div>
      </main>
   
    </div>
  );
};
