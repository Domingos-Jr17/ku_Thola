// src/pages/rh/CandidateNotifications.tsx
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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    const newNotification: NotificationItem = {
      recipientEmail: email,
      subject,
      message,
    };

    setSentNotifications((prev) => [...prev, newNotification]);
    setEmail("");
    setSubject("");
    setMessage("");
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

        <div className="flex justify-end">
          <Button type="submit">Enviar</Button>
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
