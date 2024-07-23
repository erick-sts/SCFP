import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styles from './Chart.module.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ChartProps {
  data: any;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      {data && data.labels.length > 0 ? (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Categorias',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Valor',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Nenhum dado disponível para exibir.</p>
      )}
    </div>
  );
};

export default Chart;
