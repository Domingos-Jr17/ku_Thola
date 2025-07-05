import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";

interface NotificationItem {
  recipientEmail: string;
  subject: string;
  message: string;
}

export const CandidateNotificationsRh = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentNotifications, setSentNotifications] = useState<NotificationItem[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Por favor, informe um email válido.");
      return;
    }

    const newNotification: NotificationItem = {
      recipientEmail: email,
      subject,
      message,
    };

    setSentNotifications((prev) => [...prev, newNotification]);
    setEmail("");
    setSubject("");
    setMessage("");
    setSuccessMsg("Notificação enviada com sucesso!");

    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">Enviar Notificação ao Candidato</h1>

      <form onSubmit={handleSend} className="space-y-4">
        <InputGroup
          label="Email do Candidato"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputGroup
          label="Assunto"
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <InputGroup
          label="Mensagem"
          id="message"
          textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="flex flex-col items-end gap-2">
          <Button type="submit">Enviar</Button>
          {successMsg && <p className="text-green-600">{successMsg}</p>}
        </div>
      </form>

      {sentNotifications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Notificações Enviadas</h2>
          <ul className="space-y-2">
            {sentNotifications.map((notif, index) => (
              <li key={index} className="border p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-700">
                  <strong>Para:</strong> {notif.recipientEmail}<br />
                  <strong>Assunto:</strong> {notif.subject}<br />
                  <strong>Mensagem:</strong> {notif.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
