// Tipos relacionados a recrutadores e gestão de vagas

export interface jobProps {
  id: string;
  candidateCount: number;
  _id: string;
  title: string;
  department: string;
  type: 'presencial' | 'virtual' | 'híbrido';
  expirationDate: string;
  description: string;
  requirements: string[];
  location: string;
  benefits?: string[];
}

export interface RecruiterProps {
  id: string;
  email: string;
  password: string;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
