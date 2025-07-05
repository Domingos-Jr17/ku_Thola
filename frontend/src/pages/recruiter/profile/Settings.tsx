import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export const SettingsPage = () => {
  const { user } = useAuth();

  // Estados locais para as preferências
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"pt" | "en" | "es">("pt");

  const handleSave = () => {
    // Simulação de persistência (futura integração com backend ou localStorage)
    alert("Preferências salvas com sucesso!");

    // Exemplo de onde persistir:
    // localStorage.setItem("user_settings", JSON.stringify({ notificationsEnabled, darkMode, language }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <div className="bg-white dark:bg-gray-900 rounded shadow p-6 space-y-6">
        {/* 🔧 Preferências */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Preferências</h2>

          <div className="flex items-center justify-between py-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notificações por e-mail
            </label>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Modo escuro
            </label>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idioma
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
              value={language}
              onChange={(e) => setLanguage(e.target.value as "pt" | "en" | "es")}
            >
              <option value="pt">Português</option>
              <option value="en">Inglês</option>
              <option value="es">Espanhol</option>
            </select>
          </div>
        </section>

        {/* 👤 Conta */}
        <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Minha Conta</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email: <span className="font-medium">{user?.email}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Cargo: <span className="font-medium">{user?.role}</span>
          </p>
        </section>

        {/* 💾 Ações */}
        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleSave}>Salvar Preferências</Button>
        </div>
      </div>
    </div>
  );
};
