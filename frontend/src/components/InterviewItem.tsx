
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InterviewItem = ({ interview }: any) => {
  return (
    <li className="p-4 border rounded shadow bg-white">
      <p><strong>Nome:</strong> {interview.name}</p>
      <p><strong>Data:</strong> {new Date(interview.date).toLocaleString()}</p>
      <p><strong>Link:</strong> {interview.link || "Presencial"}</p>
    </li>
  );
};
