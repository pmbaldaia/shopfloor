import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import faker from "faker";
import classes from "./chart.module.css";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Acompanhamento de Dados",
    },
  },
};

const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
];

const data = {
  labels,
  datasets: [
    {
      label: "Entrega",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(58, 90, 64)",
      backgroundColor: "rgb(58, 90, 64, 0.5)",
    },
    {
      label: "Quantidade",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(249, 133, 80)",
      backgroundColor: "rgb(249, 133, 80, 0.5)",
    },
  ],
};

export function ChartDashboard() {
  return (
    <Line className={classes.chartContainer} options={options} data={data} />
  );
}
