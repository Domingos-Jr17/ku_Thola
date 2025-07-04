import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { JobCreateForm } from "./JobCreateForm";
import { JobListItem } from "./JobListItem";
import { useJobList } from "@/hooks/useJobList";

export const ManageJobs = () => {
  const { jobs } = useJobList();
  const [tab, setTab] = useState("listagem");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Gerir Vagas</h1>

      <Tabs defaultValue={tab} value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="listagem">📋 Todas as Vagas</TabsTrigger>
          <TabsTrigger value="criar">➕ Criar Nova Vaga</TabsTrigger>
        </TabsList>

        <TabsContent value="listagem">
          {jobs.length === 0 ? (
            <p className="text-gray-600">Nenhuma vaga cadastrada ainda.</p>
          ) : (
            <ul className="space-y-4">
              {jobs.map(job => (
                <JobListItem key={job.id || job._id} job={job} />
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="criar">
          <JobCreateForm onCreated={() => setTab("listagem")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
