import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useJobContext } from '@/hooks/useJobContext'; // Importe o hook correto


interface Job {
  _id: string;
  title: string;
  department: string;
  type: string;
  expirationDate: string;
  status?: 'aberta' | 'fechada';
}

interface Props {
  job: Job;
}

export const JobListItem: React.FC<Props> = ({ job }) => {
  const navigate = useNavigate();
  const { deleteJob } = useJobContext(); // Use o hook real

  const handleDelete = () => {
    const confirm = window.confirm(`Tem certeza que deseja eliminar a vaga "${job.title}"?`);
    if (confirm) {
      deleteJob(job._id);
    }
  };

  // Opcional: formata a data para DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT');
  };

  return (
    <li className="bg-white p-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.department} · {job.type}</p>
        <p className="text-xs text-gray-500 mt-1">
          Expira em: <span className="font-medium">{formatDate(job.expirationDate)}</span>
        </p>
        {job.status && (
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold
              ${job.status === 'aberta' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {job.status === 'aberta' ? 'Aberta' : 'Fechada'}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => navigate(`/rh/vagas/${job._id}`)}>Ver Detalhes</Button>
        <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
      </div>
    </li>
  );
};

