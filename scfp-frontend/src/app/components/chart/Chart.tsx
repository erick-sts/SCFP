// src/app/components/chart/Chart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ChartProps {
  data: any;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div>
      {data && data.labels.length > 0 ? (
        <Bar data={data} />
      ) : (
        <p>Nenhum dado disponível para exibir.</p>
      )}
    </div>
  );
};

export default Chart;
