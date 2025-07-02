// src/pages/recruiter/JobDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";

// Simular fetch do contexto ou API futuramente
const jobMock = {
  _id: "123",
  title: "Engenheiro Civil",
  department: "Infraestrutura",
  description: "Responsável por supervisionar obras públicas.",
  requirements: ["Autocad", "5 anos de experiência", "Licenciatura"],
  type: "presencial",
  location: "Maputo",
  expirationDate: "2025-07-15",
  status: "aberta",
  candidateCount: 8,
};

export const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Voltar
      </Button>

      <h1 className="text-3xl font-bold mt-4 mb-2">Detalhes da Vaga</h1>
      <p className="text-gray-600 mb-6">ID da vaga: {id}</p>

      <Tabs defaultValue="candidatos">
        <TabsList>
          <TabsTrigger value="info">🔍 Informações</TabsTrigger>
          <TabsTrigger value="candidatos">📅 Candidatos</TabsTrigger>
          <TabsTrigger value="avaliacoes">⭐ Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="candidatos">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">{jobMock.title}</h2>
            <p className="text-gray-700">{jobMock.description}</p>
            <div className="mt-4">
              <p><strong>Departamento:</strong> {jobMock.department}</p>
              <p><strong>Tipo:</strong> {jobMock.type}</p>
              <p><strong>Localização:</strong> {jobMock.location}</p>
              <p><strong>Expira em:</strong> {jobMock.expirationDate}</p>
              <p><strong>Status:</strong> {jobMock.status}</p>
              <p><strong>Requisitos:</strong> {jobMock.requirements.join(", ")}</p>
            </div>
            <div className="mt-6">
              <Button variant="destructive">Fechar Candidaturas</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="entrevistas">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Candidatos Inscritos</h2>
            <p className="text-gray-600">Total: {jobMock.candidateCount} candidatos</p>
            <ul className="mt-4 space-y-2">
              <li className="bg-gray-100 p-3 rounded">João Alberto - Estado: Entrevista Agendada</li>
              <li className="bg-gray-100 p-3 rounded">Maria Chivale - Estado: Pendente</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="avaliacoes">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Avaliações</h2>
            <p className="text-gray-600">Nenhuma avaliação registrada ainda.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
