// utils/calculateCandidateScores.ts

export interface Candidato {
  id: string;
  nome: string;
  skills?: string[];
  avaliado?: boolean;
}

export interface Entrevista {
  candidateId: string;
}

export interface Vaga {
  title: string;
  requirements: string[];
  candidatos: Candidato[];
  entrevistas?: Entrevista[];
}

export interface Resultado {
  id: string;
  name: string;
  score: number;
  notes: string;
}

export function calculateCandidateScores(job: Vaga): Resultado[] {
  const requisitos = Array.isArray(job.requirements)
    ? job.requirements.map((r) => r.toLowerCase().trim())
    : [];

  return job.candidatos.map((cand) => {
    let score = 0;
    const skills = (cand.skills || []).map((s) => s.toLowerCase().trim());

    const matching = requisitos.filter((req) => skills.includes(req)).length;
    score += matching * 1.5;

    if (cand.avaliado) score += 2;

    const temEntrevista = job.entrevistas?.some((e) => e.candidateId === cand.id);
    if (temEntrevista) score += 3;

    const notes = `Matching: ${matching}/${requisitos.length}. Avaliado: ${
      cand.avaliado ? "Sim" : "Não"
    }.`;

    return {
      id: cand.id,
      name: cand.nome,
      score: Number(score.toFixed(1)),
      notes,
    };
  }).sort((a, b) => b.score - a.score);
}
