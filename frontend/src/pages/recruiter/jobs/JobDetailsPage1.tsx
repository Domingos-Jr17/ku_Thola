import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { useJobContext } from "@/hooks/useJobContext";
import { ScheduleInterviewModal } from "@/components/cards/forms/ScheduleInterviewModal";
import { toast } from "sonner";

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, avaliarCandidato, agendarEntrevista, fecharCandidaturas } = useJobContext();

  const jobData = getJobById(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{ id: string; nome: string } | null>(null);

  if (!jobData) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Vaga não encontrada</h1>
        <Button onClick={() => navigate("/rh/vagas")}>Voltar para Vagas</Button>
      </div>
    );
  }

  const handleFecharCandidaturas = () => {
    fecharCandidaturas(jobData.id);
    toast.success("Candidaturas fechadas com sucesso!");
  };

  const handleAvaliar = (candidateId: string) => {
    avaliarCandidato(jobData.id, candidateId);
    toast.success("Candidato avaliado com sucesso!");
  };

  const openScheduleModal = (candidateId: string, candidateName: string) => {
    setSelectedCandidate({ id: candidateId, nome: candidateName });
    setIsModalOpen(true);
  };

  const handleScheduleSubmit = (date: string, time: string, link: string) => {
    if (!selectedCandidate) return;
    const dateTime = `${date}T${time}`;
    const newInterview = {
      id: `int${Date.now()}`,
      name: selectedCandidate.nome,
      date: dateTime,
      link,
      candidateId: selectedCandidate.id,
    };
    agendarEntrevista(jobData.id, newInterview);
    toast.success("Entrevista agendada com sucesso!");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vaga: {jobData.title}</h1>

      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <p><strong>Status:</strong> {jobData.status}</p>
        <p><strong>Local:</strong> {jobData.local}</p>
        <p><strong>Data de criação:</strong> {jobData.dataCriacao}</p>
        <p className="mt-2 text-gray-700 whitespace-pre-line">{jobData.descricao}</p>
        {jobData.status === "Aberta" && (
          <Button className="mt-4" variant="destructive" onClick={handleFecharCandidaturas}>
            Fechar candidaturas
          </Button>
        )}
      </div>

      <Tabs defaultValue="candidatos">
        <TabsList>
          <TabsTrigger value="candidatos">Candidatos</TabsTrigger>
          <TabsTrigger value="entrevistas">Entrevistas</TabsTrigger>
          <TabsTrigger value="feedbacks">Feedbacks Finais</TabsTrigger>
        </TabsList>

        {/* TAB: Candidatos */}
        <TabsContent value="candidatos">
          <ul className="space-y-4">
            {jobData.candidatos.length === 0 ? (
              <p className="text-gray-600">Nenhum candidato inscrito ainda.</p>
            ) : (
              jobData.candidatos.map((cand) => (
                <li
                  key={cand.id}
                  className="bg-gray-50 p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{cand.nome}</h3>
                    <p>Status: {cand.status}</p>
                    <p>Avaliado: {cand.avaliado ? "Sim" : "Não"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/rh/candidato/${cand.id}`)}>
                      Ver Perfil
                    </Button>

                    {cand.avaliado ? (
                      <Button variant="secondary" disabled>
                        Avaliado ✓
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => handleAvaliar(cand.id)}>
                        Avaliar
                      </Button>
                    )}

                    <Button onClick={() => openScheduleModal(cand.id, cand.nome)}>
                      Agendar Entrevista
                    </Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </TabsContent>

        {/* TAB: Entrevistas */}
        <TabsContent value="entrevistas">
          {jobData.entrevistas.length === 0 ? (
            <p className="text-gray-600">Nenhuma entrevista agendada.</p>
          ) : (
            <ul className="space-y-3">
              {jobData.entrevistas.map((int) => (
                <li key={int.id} className="p-4 border rounded shadow bg-white">
                  <p><strong>Nome:</strong> {int.name}</p>
                  <p><strong>Data:</strong> {new Date(int.date).toLocaleString()}</p>
                  <p><strong>Link:</strong> {int.link || "Presencial"}</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        {/* TAB: Feedbacks */}
        <TabsContent value="feedbacks">
          <p className="text-gray-600">Funcionalidade em construção.</p>
        </TabsContent>
      </Tabs>

      {/* Modal para agendamento */}
      <ScheduleInterviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleScheduleSubmit}
        candidateName={selectedCandidate?.nome || ""}
      />
    </div>
  );
};

export default JobDetailsPage;
