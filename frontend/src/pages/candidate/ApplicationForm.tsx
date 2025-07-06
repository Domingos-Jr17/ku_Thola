import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { FileUpload } from "@/components/FileUpload";
import { InputGroup } from "@/components/ui/InputGroup";

import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const ApplicationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvText, setCvText] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState("");
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingTextExtraction, setLoadingTextExtraction] = useState(false);

  const navigate = useNavigate();

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: unknown) => (item as { str: string }).str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  };

  const extractTextFromDocx = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const extractBasicInfo = (text: string) => {
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);
    const phoneMatch = text.match(/(\+258\s?)?8\d{2}\s?\d{3}\s?\d{3}/);
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    let probableName = "";
    for (const line of lines) {
      if (!line.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i) && !line.match(/(\+258\s?)?8\d{2}\s?\d{3}\s?\d{3}/) && line.length > 3) {
        probableName = line;
        break;
      }
    }

    return {
      name: probableName,
      email: emailMatch?.[0] || "",
      phone: phoneMatch?.[0] || "",
    };
  };

  const handleFileSelect = async (file: File | null) => {
    setCv(file);
    setCvText("");
    if (!file) return;

    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      alert("Por favor, envie um arquivo PDF ou DOCX.");
      setCv(null);
      return;
    }

    try {
      setLoadingTextExtraction(true);
      let extractedText = "";
      if (file.type === "application/pdf") {
        extractedText = await extractTextFromPDF(file);
      } else {
        extractedText = await extractTextFromDocx(file);
      }

      setCvText(extractedText);

      const info = extractBasicInfo(extractedText);
      if (!name && info.name) setName(info.name);
      if (!email && info.email) setEmail(info.email);
      if (!phone && info.phone) setPhone(info.phone);

    } catch (error) {
      console.error("Erro ao extrair texto:", error);
      alert("Falha ao extrair texto do CV.");
      setCvText("");
    } finally {
      setLoadingTextExtraction(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !cv) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    setModalOpen(true);
  };

  const confirmSubmit = () => {
    setModalOpen(false);
    setIsSubmitting(true);

    console.log({ name, email, phone, cv, cvText, coverLetter });

    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
      setIsSubmitting(false);
      navigate("/candidato/minha-candidatura");

      setName("");
      setEmail("");
      setPhone("");
      setCv(null);
      setCvText("");
      setCoverLetter("");
      setShowCoverLetter(false);
    }, 2500);
  };

  return (
    <div>
      <main>
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-8 text-primary-700">
            Formulário de Candidatura
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <InputGroup
              label="Nome completo"
              id="name"
              value={name}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
            <InputGroup
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
              placeholder="exemplo@dominio.com"
              required
            />
            <InputGroup
              label="Telefone"
              id="phone"
              type="tel"
              value={phone}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhone(e.target.value)}
              placeholder="+258 8XX XXX XXX"
              required
            />
            <FileUpload
              label="Upload do CV (PDF ou DOCX)"
              onFileSelect={handleFileSelect}
            />

            {loadingTextExtraction ? (
              <p className="text-gray-600 mt-2">Extraindo texto do CV...</p>
            ) : cvText ? (
              <div className="mt-4 p-4 border rounded bg-gray-50 max-h-48 overflow-auto whitespace-pre-wrap text-sm text-gray-700">
                <h3 className="font-semibold mb-2">Texto extraído do CV (para revisão):</h3>
                <pre>{cvText}</pre>
              </div>
            ) : null}

            {!showCoverLetter && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setShowCoverLetter(true)}
                >
                  + Incluir carta de apresentação
                </button>
              </div>
            )}

            {showCoverLetter && (
              <InputGroup
                label="Carta de Apresentação (opcional)"
                id="coverLetter"
                value={coverLetter}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCoverLetter(e.target.value)}
                placeholder="Fale brevemente sobre sua motivação..."
                textarea
                rows={5}
              />
            )}

            <div className="flex justify-center">
              <Button variant="outline" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Candidatura"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirmar Envio">
        <p>Tem certeza que deseja enviar sua candidatura?</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={confirmSubmit}>
            Confirmar
          </Button>
        </div>
      </Modal>

      {toastVisible && (
        <ToastNotification message="Candidatura enviada com sucesso!" onClose={() => setToastVisible(false)} />
      )}
    </div>
  );
};
