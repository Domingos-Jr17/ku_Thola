import { useNavigate } from 'react-router-dom';
import { useJobContext } from '@/hooks/useJobContext'; // Use o hook padrão do projeto
import { Button } from '@/components/ui/Button';
import type { jobProps } from '@/types/recruiterProps';

const JobCard = ({ job }: { job: jobProps }) => {
  const navigate = useNavigate();
  const hoje = new Date();
  const isExpired = new Date(job.expirationDate) < hoje;

  return (
    <li
      key={job.id || job._id}
      className={`bg-white shadow-md rounded-2xl p-6 border ${
        isExpired ? 'border-red-400 bg-red-50 opacity-70' : 'border-gray-200'
      } flex flex-col justify-between`}
      aria-label={`${job.title} - ${isExpired ? 'Vaga expirada' : 'Vaga ativa'}`}
    >
      <div>
        <h2
          className={`text-xl font-semibold ${
            isExpired ? 'text-red-600 line-through' : 'text-primary-800'
          }`}
        >
          {job.title}
        </h2>

        {isExpired && (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-200 rounded-full mb-2">
            Expirada
          </span>
        )}

        <p className="text-gray-700 mt-1 text-sm">
          <strong>Departamento:</strong> {job.department}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Tipo:</strong> {job.type}
        </p>
        <p className="text-gray-700 mb-4 text-sm">
          <strong>Data de término:</strong>{' '}
          {new Date(job.expirationDate).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <Button
        onClick={() => navigate(`${job.id || job._id}`)}
        className="mt-auto w-full"
        aria-label={`Ver detalhes da vaga: ${job.title}`}
        disabled={isExpired}
        title={isExpired ? "Esta vaga está expirada e não pode ser aplicada" : ""}
      >
        Ver Detalhes &rarr;
      </Button>
    </li>
  );
};

export const JobsList = () => {
  const { jobs } = useJobContext();
  const hoje = new Date();

  // Ordenar vagas: não expiradas primeiro, depois expiradas
  const sortedJobs = [...jobs].sort((a, b) => {
    const aExpired = new Date(a.expirationDate) < hoje;
    const bExpired = new Date(b.expirationDate) < hoje;

    if (aExpired === bExpired) {
      return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
    }
    if (aExpired && !bExpired) return 1;
    if (!aExpired && bExpired) return -1;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main
        role="main"
        className="flex-grow max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-3xl font-bold text-center text-primary-700 mb-10">
          Vagas Disponíveis
        </h1>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma vaga disponível no momento.</p>
        ) : (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            aria-label="Lista de vagas disponíveis"
          >
            {sortedJobs.map((job) => {
              // Map type to lowercase to match jobProps
              const mappedJob = {
                ...job,
                type:
                  job.type === "Presencial"
                    ? "presencial"
                    : job.type === "Virtual"
                    ? "virtual"
                    : job.type === "Híbrido"
                    ? "híbrido"
                    : job.type,
              } as jobProps;
              return <JobCard key={job.id || job._id} job={mappedJob} />;
            })}
          </ul>
        )}
      </main>
    </div>
  );
};
