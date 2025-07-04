import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "@/components/ui/InputGroup";
import { Button } from "@/components/ui/Button";

export const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ⚠️ Simulação para testes (remova ou condicione para ambiente de dev)
    if (email === "recrutador@empresa.com" && password === "123456") {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("userId", "mock-user-id");
      navigate("/rh/dashboard");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("rh_token", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/rh/dashboard");
      } else {
        setError("Falha no login. Verifique suas credenciais.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro no sistema. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-black bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/img/fundo-2.jpg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login do Recrutador
        </h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-200 rounded px-3 py-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <InputGroup
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputGroup
            label="Senha"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};
