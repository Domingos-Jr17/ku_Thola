export interface userProps extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "candidato" | "recrutador" | "admin";
  skills?: string[];
  createdAt: Date;
}