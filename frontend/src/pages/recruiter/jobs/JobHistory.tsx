import { useJobContext } from '@/hooks/useJobContext'; // Updated import path
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { Job } from '@/context/jobsContext';

export const JobHistory = () => {
  const { jobs } = useJobContext(); // Updated hook name
  const navigate = useNavigate();
  
  // Filtra apenas vagas encerradas (com data de expiração anterior a hoje)
  const vagasEncerradas = jobs.filter((job: Job) => { // Added type annotation
    if (!job.expirationDate) return false;
    const expiration = new Date(job.expirationDate);
    const now = new Date();
    return expiration < now;
  });
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Button onClick={() => navigate('/rh/dashboard')}>← Voltar ao Dashboard</Button>
      <h1 className="text-3xl font-bold my-6">Histórico de Vagas Encerradas</h1>
      {vagasEncerradas.length === 0 ? (
        <p className="text-gray-600">Nenhuma vaga encerrada até o momento.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Título</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Departamento</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Data de Expiração</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Candidatos</th>
            </tr>
          </thead>
          <tbody>
            {vagasEncerradas.map((job: Job) => ( // Added type annotation
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{job.title}</td>
                <td className="border border-gray-300 px-4 py-2">{job.department}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{job.type}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(job.expirationDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{job.candidateCount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};