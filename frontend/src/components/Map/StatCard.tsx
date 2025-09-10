import React from 'react';

interface StatCardProps {
  value: number | string;
  label: string;
  color: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color, borderColor }) => {
  return (
    <div className={`p-6 bg-gradient-to-br from-primary-darkgray to-black rounded-xl shadow-xl text-center border ${borderColor}`}>
      <div className={`number text-3xl font-bold ${color}`}>{value}</div>
      <div className="label text-md text-primary-lightgray mt-1">{label}</div>
    </div>
  );
};

export default StatCard;
