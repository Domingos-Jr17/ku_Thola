/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export const RecruiterProfile = () => {
  const { user, updateUser } = useAuth();

  // Protege contra ausência de usuário (casos de carregamento inicial)
  if (!user) {
    return <div className="p-6 text-center text-gray-600">Carregando perfil...</div>;
  }

  // Estados controlados dos inputs
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [photoPreview, setPhotoPreview] = useState(user.photoUrl || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handler para upload da foto
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  // Salvar alterações
  const handleSave = () => {
    updateUser({ name, email, photoUrl: photoPreview });

    if (password) {
      console.log("🔐 Nova senha digitada:", password);
      // Futuro: enviar senha para API
    }

    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">

        {/* 📸 Foto de perfil */}
        <div className="flex items-center gap-4">
          <img
            src={photoPreview || "/img/default-avatar.png"}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <Button onClick={() => fileInputRef.current?.click()}>
              Alterar Foto
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* 📝 Formulário de dados */}
        <div className="space-y-4">

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
            <p className="text-xs text-gray-500 mt-1">
              Trocar senha ainda não está implementado no servidor.
            </p>
          </div>
        </div>

        {/* 📋 Informações do sistema */}
        <div className="text-sm text-gray-600 space-y-1 mt-4">
          <p><strong>Cargo:</strong> {user.role}</p>
          <p>
            <strong>Último login:</strong>{" "}
            {format(new Date(user.lastLogin), "dd/MM/yyyy 'às' HH:mm", {
              locale: pt,
            })}
          </p>
        </div>

        {/* 💾 Botão de salvar */}
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};
