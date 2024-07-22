import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Definir o tipo de dados do gráfico
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor?: string[];
  }[];
}

// Props do componente
interface ChartProps {
  data: ChartData;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default Chart;
