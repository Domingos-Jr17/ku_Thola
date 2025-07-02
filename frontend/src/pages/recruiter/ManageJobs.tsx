// src/pages/recruiter/ManageJobs.tsx

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { JobCreateForm } from './rh/JobCreateForm';
import { useJobs } from '@/context/jobsContext';
import { JobListItem } from './rh/JobListItem';

export const ManageJobs = () => {
  const { jobs } = useJobs();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Gerir Vagas</h1>

      <Tabs defaultValue="listagem">
        <TabsList>
          <TabsTrigger value="listagem">📋 Todas as Vagas</TabsTrigger>
          <TabsTrigger value="criar">➕ Criar Nova Vaga</TabsTrigger>
        </TabsList>

        <TabsContent value="listagem">
          {jobs.length === 0 ? (
            <p className="text-gray-600">Nenhuma vaga cadastrada ainda.</p>
          ) : (
            <ul className="space-y-4">
              {jobs.map((job) => (
                <JobListItem key={job._id} job={job} />
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="criar">
          <JobCreateForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
