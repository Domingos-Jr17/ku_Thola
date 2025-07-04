import type { CandidateProps } from "@/types/candidateProps"; 


export const CandidateCard = ({ name, email, phone }: CandidateProps) => {
  return (
    <div className="p-4 bg-white rounded-xl border shadow">
      <h3 className="text-md font-semibold text-[#111827]">{name}</h3>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">{phone}</p>
    </div>
  );
};
