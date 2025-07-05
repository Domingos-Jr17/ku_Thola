// components/Reports/CandidatesPerJobChart.tsx
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar os componentes
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dados simulados
const data = {
  labels: [
    "Engenheiro Civil",
    "Técnico de Segurança",
    "Analista de Sistemas",
    "Gerente de Projetos",
  ],
  datasets: [
    {
      label: "Candidatos",
      data: [20, 15, 12, 8],
      backgroundColor: "#3b82f6", // azul tailwind
    },
  ],
};

// Opções do gráfico
const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Candidatos por Vaga" },
  },
};

export const CandidatesPerJobChart = () => {
  return <Bar options={options} data={data} />;
};
