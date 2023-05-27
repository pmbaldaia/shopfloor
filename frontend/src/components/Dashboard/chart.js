import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = () => {
  // Dados de entrega (exemplo)
  const dadosEntrega = [
    { data_entrega: "2023-05-20", quantidade: 10 },
    { data_entrega: "2023-05-21", quantidade: 15 },
    { data_entrega: "2023-05-22", quantidade: 8 },
    { data_entrega: "2023-05-23", quantidade: 12 },
    { data_entrega: "2023-05-24", quantidade: 5 },
  ];

  // Ordena os dados pela data de entrega
  dadosEntrega.sort((a, b) => {
    const dataA = new Date(a.data_entrega);
    const dataB = new Date(b.data_entrega);
    return dataA - dataB;
  });

  // Extrai as datas e quantidades dos dados de entrega
  const labels = dadosEntrega.map((dado) => dado.data_entrega);
  const quantidades = dadosEntrega.map((dado) => dado.quantidade);

  // Configuração do gráfico
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quantidade de Entregas",
        data: quantidades,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default Chart;
