// src/layouts/WithCandidateLayoutIfAuthenticated.tsx
// src/layouts/WithCandidateLayoutIfAuthenticated.tsx
import type { ReactNode } from "react";
import { Header } from "@/components/layout/headers";
import { Footer } from "@/components/layout/footer";
import CandidateLayout from "./candidate/CandidateLayout";

export const CandidateLayoutIfAuthenticated = ({ children }: { children: ReactNode }) => {
  const isCandidateLoggedIn = !!localStorage.getItem("token_candidato");

  if (isCandidateLoggedIn) {
    return <CandidateLayout></CandidateLayout>;
  }

  return (
    <div className="bg-black bg-[url('../img/fundo-2.jpg')] bg-cover bg-center min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
