// src/components/recruiter/JobCreateForm.tsx

import React, { useState } from 'react';
import { InputGroup } from '@/components/ui/InputGroup';
import { Button } from '@/components/ui/Button';
import { useJobs } from '@/context/jobsContext';

export const JobCreateForm = () => {
  const { addJob } = useJobs();

  const [form, setForm] = useState({
    title: '',
    department: '',
    type: '' as 'presencial' | 'virtual' | '',
    expirationDate: '',
    location: '',
    requirements: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreate = () => {
    const { title, department, type, expirationDate, location, requirements, description } = form;

    if (!title || !department || !type || !expirationDate || !location || !requirements || !description) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    addJob({
      title,
      department,
      type,
      expirationDate,
      location,
      requirements: requirements.split(',').map(r => r.trim()),
      description,
      benefits: [],
      candidateCount: 0
    });

    setForm({
      title: '',
      department: '',
      type: '',
      expirationDate: '',
      location: '',
      requirements: '',
      description: ''
    });

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Criar nova vaga</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup label="Título da vaga" id="title" value={form.title} onChange={handleChange('title')} required />
        <InputGroup label="Departamento" id="department" value={form.department} onChange={handleChange('department')} required />

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-800 mb-1">Tipo</label>
          <select
            id="type"
            value={form.type}
            onChange={handleChange('type')}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Selecione</option>
            <option value="presencial">Presencial</option>
            <option value="virtual">Virtual</option>
          </select>
        </div>

        <InputGroup label="Data de expiração" id="expirationDate" type="date" value={form.expirationDate} onChange={handleChange('expirationDate')} required />
        <InputGroup label="Localização" id="location" value={form.location} onChange={handleChange('location')} required />
        <InputGroup label="Requisitos (separados por vírgula)" id="requirements" value={form.requirements} onChange={handleChange('requirements')} required textarea rows={2} />
        <InputGroup label="Descrição da vaga" id="description" value={form.description} onChange={handleChange('description')} required textarea rows={4} />
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? 'Criando...' : 'Criar Vaga'}
        </Button>
      </div>
    </div>
  );
};
