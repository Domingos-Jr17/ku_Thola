import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

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

const MessageRow = ({ msg }: { msg: CandidateMessage }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-50 transition" key={msg.id}>
      <td className="px-4 py-2">{msg.name}</td>
      <td className="px-4 py-2">{msg.email}</td>
      <td className="px-4 py-2">{msg.lastMessage}</td>
      <td className="px-4 py-2">
        {format(parseISO(msg.date), "dd 'de' MMMM 'de' yyyy", { locale: pt })}
      </td>
      <td className="px-4 py-2">
        <button
          aria-label={`Ver conversa com ${msg.name}`}
          className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          onClick={() => navigate(`/rh/candidato/${msg.id}/comunicacao`)}
        >
          Ver Conversa
        </button>
      </td>
    </tr>
  );
};

export const Messages = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full table-auto min-w-[600px]">
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
              <MessageRow key={msg.id} msg={msg} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
