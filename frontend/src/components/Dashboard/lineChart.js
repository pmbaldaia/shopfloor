import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdens } from "../../axios/ordens";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Container } from "react-bootstrap";
import Loading from "./loading";

const LineChartDashboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrdens(user.access_token);
        const ordens = res.data.ordens;

        const formattedData = ordens.map((ordem) => ({
          name: ordem.data_venda,
          primeiro_consumo: ordem.primeiro_consumo,
          ultimo_consumo: ordem.ultimo_consumo,
          quantidade: ordem.quantidade,
        }));

        setData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Erro ao acessar os dados", error);
      }
    };

    fetchData();
  }, [user.access_token]);

  return (
    <Container fluid>
      {data.length > 0 ? (
        <LineChart width={550} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="primeiro_consumo"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            dataKey="ultimo_consumo"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line dataKey="quantidade" stroke="red" activeDot={{ r: 8 }} />
        </LineChart>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default LineChartDashboard;
