import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";

type InterviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { date: string; link: string; notes: string }) => void;
  initialData?: { date: string; link: string; notes: string };
};

export const InterviewModal = ({
  isOpen,
  onClose,
  onConfirm,
  initialData,
}: InterviewModalProps) => {
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date || "");
      setLink(initialData.link || "");
      setNotes(initialData.notes || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ date, link, notes });
    setDate("");
    setLink("");
    setNotes("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agendar Entrevista">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputGroup
          label="Data e Hora"
          type="datetime-local"
          id="interviewDate"
          required
          value={date}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDate(e.target.value)}
        />

        <InputGroup
          label="Link da Reunião (Zoom, Meet, etc.)"
          type="url"
          id="meetingLink"
          placeholder="https://..."
          value={link}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLink(e.target.value)}
        />

        <InputGroup
          label="Observações"
          id="notes"
          placeholder="Ex: Levar portfólio, entrevista técnica..."
          textarea
          rows={3}
          value={notes}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Agendar</Button>
        </div>
      </form>
    </Modal>
  );
};
