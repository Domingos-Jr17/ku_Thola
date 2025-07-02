// src/components/recruiter/ScheduleInterviewModal.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, time: string, link: string) => void;
  candidateName: string;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  candidateName,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!date || !time) {
      alert("Por favor, selecione a data e hora da entrevista.");
      return;
    }
    onSubmit(date, time, link);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Agendar entrevista - {candidateName}</h2>
        <div className="flex flex-col gap-4">
          <label>
            Data:
            <input
              type="date"
              className="mt-1 w-full border rounded px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Hora:
            <input
              type="time"
              className="mt-1 w-full border rounded px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label>
            Link (opcional):
            <input
              type="url"
              placeholder="https://meet.example.com/..."
              className="mt-1 w-full border rounded px-3 py-2"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Agendar</Button>
        </div>
      </div>
    </div>
  );
};
