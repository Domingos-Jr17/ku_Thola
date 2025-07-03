import { useParams, useNavigate } from "react-router-dom";
import { useJobContext } from "@/hooks/useJobContext";
import { Button } from "@/components/ui/Button";

interface Candidate {
  name: string;
  email: string;
  phones: string;
  jobTitle: string;
}

const mockCandidates: Candidate[] = [
  { name: "Albertina Dlambe", email: "dlambealbertina@gmail.com", phones: "871522004", jobTitle: "Desenvolvedor Frontend" },
  { name: "Almório Adolfo Chaguala", email: "almorioadolfo01@gmail.com", phones: "844138349", jobTitle: "Analista de Marketing" },
  { name: "Graça Boaventura Bila", email: "gracabilla002@gmail.com", phones: "858768416", jobTitle: "Desenvolvedor Frontend" },
  { name: "Domingos A. Timane Jr", email: "domingosalfredotimane@gmail.com", phones: "820885159", jobTitle: "Desenvolvedor Frontend" },
];

export const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useJobContext();
  const navigate = useNavigate();

  const job = jobs.find(j => j._id === id);

  const filteredCandidates = mockCandidates.filter(c => c.jobTitle === job?.title);

  if (!job) {
    return <div className="p-6">Vaga não encontrada.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Button onClick={() => navigate('/rh/vagas')} className="mb-4">← Voltar</Button>
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <p><strong>Departamento:</strong> {job.department}</p>
        <p><strong>Tipo:</strong> {job.type}</p>
        <p><strong>Localização:</strong> {job.location}</p>
        <p><strong>Expira em:</strong> {job.expirationDate}</p>
        <p className="mt-4"><strong>Descrição:</strong> {job.description}</p>
        <p className="mt-2"><strong>Requisitos:</strong> {job.requirements.join(", ")}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Candidatos para esta vaga</h2>
      {filteredCandidates.length === 0 ? (
        <p>Nenhum candidato para esta vaga ainda.</p>
      ) : (
        <div className="bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{c.name}</td>
                  <td className="px-4 py-2 text-blue-600 underline">{c.email}</td>
                  <td className="px-4 py-2">{c.phones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
