// JobDetailsPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { ScheduleInterviewModal } from "@/components/cards/forms/ScheduleInterviewModal";
import { useJobDetails } from "@/hooks/useJobDetails";
import { CandidateCard } from "@/components/cards/Candidatecard";
import { InterviewItem } from "@/components/InterviewItem";



export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    job,
    modalOpen,
    selectedCandidate,
    setModalOpen,
    openScheduleModal,
    handleScheduleSubmit,
    handleAvaliar,
    handleFecharCandidaturas,
  } = useJobDetails(id);

  if (!job) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Vaga não encontrada</h1>
        <Button onClick={() => navigate("/rh/vagas")}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vaga: {job.title}</h1>

      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Local:</strong> {job.local}</p>
        <p><strong>Data de criação:</strong> {job.dataCriacao}</p>
        <p className="mt-2 text-gray-700 whitespace-pre-line">{job.descricao}</p>
        {job.status === "Aberta" && (
          <Button className="mt-4" variant="destructive" onClick={handleFecharCandidaturas}>
            Fechar candidaturas
          </Button>
        )}
      </div>

      <Tabs defaultValue="candidatos">
        <TabsList>
          <TabsTrigger value="candidatos">Candidatos</TabsTrigger>
          <TabsTrigger value="entrevistas">Entrevistas</TabsTrigger>
          <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
        </TabsList>

        <TabsContent value="candidatos">
          <ul className="space-y-4">
            {job.candidatos.length === 0 ? (
              <p className="text-gray-600">Nenhum candidato ainda.</p>
            ) : (
              job.candidatos.map(cand => (
                <CandidateCard
                  key={cand.id}
                  candidate={cand}
                  onAvaliar={() => handleAvaliar(cand.id)}
                  onAgendar={() => openScheduleModal(cand.id, cand.nome)}
                />
              ))
            )}
          </ul>
        </TabsContent>

        <TabsContent value="entrevistas">
          {job.entrevistas.length === 0 ? (
            <p className="text-gray-600">Nenhuma entrevista.</p>
          ) : (
            <ul className="space-y-3">
              {job.entrevistas.map(int => (
                <InterviewItem key={int.id} interview={int} />
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="feedbacks">
          <p className="text-gray-600">Funcionalidade em construção.</p>
        </TabsContent>
      </Tabs>

      <ScheduleInterviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleScheduleSubmit}
        candidateName={selectedCandidate?.nome || ""}
      />
    </div>
  );
};


