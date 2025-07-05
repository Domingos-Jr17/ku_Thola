import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/Button";

type InterviewMethod = "Presencial" | "Zoom" | "Google Meet";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, time: string, method: InterviewMethod) => void;
  candidateName?: string;
  initialDate?: string;
  initialTime?: string;
  initialMethod?: InterviewMethod;
  isRescheduling?: boolean;
}

export const ScheduleInterviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  candidateName = "",
  initialDate = "",
  initialTime = "",
  initialMethod = "Presencial",
  isRescheduling = false,
}: Props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState<InterviewMethod>("Presencial");

  useEffect(() => {
    if (isOpen) {
      setDate(initialDate);
      setTime(initialTime);
      setMethod(initialMethod);
    }
  }, [isOpen, initialDate, initialTime, initialMethod]);

  const handleSubmit = () => {
    if (!date || !time || !method) return;
    onSubmit(date, time, method);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded-lg shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-bold">
            {isRescheduling ? "Reagendar Entrevista" : "Agendar Entrevista"}
          </Dialog.Title>

          {candidateName && (
            <p className="text-sm text-gray-700 mb-2">
              Candidato: <strong>{candidateName}</strong>
            </p>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <input
                type="time"
                className="w-full border rounded px-3 py-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Método</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={method}
                onChange={(e) => setMethod(e.target.value as InterviewMethod)}
              >
                <option value="Presencial">Presencial</option>
                <option value="Zoom">Zoom</option>
                <option value="Google Meet">Google Meet</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!date || !time || !method}
            >
              {isRescheduling ? "Reagendar" : "Agendar"}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
