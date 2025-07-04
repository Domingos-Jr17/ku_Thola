import { useNavigate } from "react-router-dom";

interface CandidateMessage {
  id: string;
  name: string;
  email: string;
  lastMessage: string;
  date: string;
}

const mockMessages: CandidateMessage[] = [
  { id: "1", name: "Albertina Dlambe", email: "dlambealbertina@gmail.com", lastMessage: "Aguardamos seu feedback.", date: "2025-06-28" },
  { id: "2", name: "Graça Bila", email: "gracabilla002@gmail.com", lastMessage: "Agendada entrevista para 30/06.", date: "2025-06-27" },
  { id: "3", name: "Domingos Timane", email: "domingosalfredotimane@gmail.com", lastMessage: "Vaga encerrada.", date: "2025-06-26" },
];

export const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
      <div className="bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Candidato</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Última Mensagem</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockMessages.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2">{msg.name}</td>
                <td className="px-4 py-2">{msg.email}</td>
                <td className="px-4 py-2">{msg.lastMessage}</td>
                <td className="px-4 py-2">{msg.date}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/rh/candidato/${msg.id}/comunicacao`)}
                  >
                    Ver Conversa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
