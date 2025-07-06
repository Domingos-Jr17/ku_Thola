import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (data: { rating: number; feedback: string }) => void;
};

export const FeedbackModal = ({
  isOpen,
  onClose,
  onSubmitFeedback,
}: FeedbackModalProps) => {
  const [rating, setRating] = useState<string>("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === "" || feedback.trim() === "") return;
    onSubmitFeedback({ rating: Number(rating), feedback });
    setRating("");
    setFeedback("");
  };

  // Garante que só valores entre 0 e 10 sejam aceitos
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (/^\d{1,2}$/.test(value) && Number(value) >= 0 && Number(value) <= 10)
    ) {
      setRating(value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Feedback da Entrevista">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputGroup
          label="Nota (0 a 10)"
          id="rating"
          type="number"
          min={0}
          max={10}
          required
          value={rating}
          onChange={handleRatingChange}
        />

        <InputGroup
          label="Feedback"
          id="feedback"
          placeholder="Escreva observações sobre a entrevista..."
          textarea
          rows={4}
          required
          value={feedback}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFeedback(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={rating === "" || feedback.trim() === ""}
          >
            Enviar Feedback
          </Button>
        </div>
      </form>
    </Modal>
  );
};

