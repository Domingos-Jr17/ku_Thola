import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { JobCreateForm } from './JobCreateForm';
import { useJobContext } from '@/hooks/useJobContext';
import { JobListItem } from './JobListItem';

export const ManageJobs = () => {
  const { jobs } = useJobContext();
  const [tab, setTab] = useState('listagem');

  // Map status values to match expected type
  const normalizedJobs = jobs.map(job => ({
    ...job,
    status:
      job.status === 'Aberta'
        ? 'aberta'
        : job.status === 'Fechada'
        ? 'fechada'
        : (job.status as "aberta" | "fechada" | undefined),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Gerir Vagas</h1>

      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="listagem">📋 Todas as Vagas</TabsTrigger>
          <TabsTrigger value="criar">➕ Criar Nova Vaga</TabsTrigger>
        </TabsList>

        <TabsContent value="listagem">
          {normalizedJobs.length === 0 ? (
            <p className="text-gray-600">Nenhuma vaga cadastrada ainda.</p>
          ) : (
            <ul className="space-y-4">
              {normalizedJobs.map(job => (
                <JobListItem key={job.id || job._id} job={job} />
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="criar">
          {/* Passa onCreated para mudar a aba */}
          <JobCreateForm onCreated={() => setTab('listagem')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
