import { useJobContext } from '@/hooks/useJobContext';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { getExpiredJobs } from '@/utils/jobFilters';
import type { Job } from '@/context/jobsContext';

export const JobHistory = () => {
  const { jobs } = useJobContext();
  const navigate = useNavigate();

  const vagasEncerradas = getExpiredJobs(jobs).sort(
    (a, b) => new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime()
  );

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('pt-PT').format(new Date(date));

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
              <th className="border px-4 py-2">Título</th>
              <th className="border px-4 py-2">Departamento</th>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2">Expiração</th>
              <th className="border px-4 py-2">Candidatos</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagasEncerradas.map((job: Job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.department}</td>
                <td className="border px-4 py-2">{job.type}</td>
                <td className="border px-4 py-2">{formatDate(job.expirationDate)}</td>
                <td className="border px-4 py-2">{job.candidateCount || 0}</td>
                <td className="border px-4 py-2">
                  <Button size="sm" onClick={() => navigate(`/rh/vagas/${job._id}`)}>
                    Ver Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
