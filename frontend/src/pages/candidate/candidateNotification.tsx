import  { useState, useEffect } from "react";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const CandidateNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock inicial
    const fetched: Notification[] = [
      {
        id: "1",
        title: "Status da candidatura atualizado",
        message: "Sua candidatura para Desenvolvedor Frontend mudou para 'Em Avaliação'.",
        date: "2025-06-20T15:30:00Z",
        read: false,
      },
      {
        id: "2",
        title: "Entrevista agendada",
        message: "Sua entrevista para Analista de Marketing foi marcada para 10 de Julho às 09:00.",
        date: "2025-06-18T09:00:00Z",
        read: true,
      },
      {
        id: "3",
        title: "Mensagem do recrutador",
        message: "Por favor, envie seu portfólio atualizado para análise.",
        date: "2025-06-17T14:00:00Z",
        read: false,
      },
    ];
    setNotifications(fetched);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BellIcon className="w-6 h-6 text-blue-600" />
            Notificações
          </h1>
          {notifications.some((n) => !n.read) && (
            <Button variant="outline" onClick={markAllAsRead}>
              Marcar todas como lidas
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-600">Nenhuma notificação no momento.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map(({ id, title, message, date, read }) => (
              <li
                key={id}
                className={`p-4 border rounded-md transition ${
                  read ? "bg-gray-100" : "bg-blue-50 border-blue-400"
                }`}
              >
                <article className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-700 mt-1">{message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(date).toLocaleString("pt-PT", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  {!read && (
                    <button
                      onClick={() => markAsRead(id)}
                      className="text-sm text-blue-600 hover:underline focus:outline-none"
                      aria-label={`Marcar notificação "${title}" como lida`}
                    >
                      Marcar como lida
                    </button>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
