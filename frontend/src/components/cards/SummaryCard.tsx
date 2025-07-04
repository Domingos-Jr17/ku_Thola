import React from "react";

interface SummaryCardProps {
  title: string;
  value: number | string;
  color?: string;
  onClick?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  color = "text-blue-600",
  onClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white shadow rounded-lg p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
  >
    <h2 className={`text-lg sm:text-xl font-semibold ${color}`}>{title}</h2>
    <p className="mt-2 text-2xl sm:text-3xl font-bold">{value}</p>
  </div>
);
