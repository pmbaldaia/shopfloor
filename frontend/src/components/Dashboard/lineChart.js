import { Line } from "react-chartjs-2";
import Loading from "./loading";
import { Col } from "react-bootstrap";

function LineChart(props) {
  const { ordensData } = props;

  if (!ordensData || !ordensData.labels || !ordensData.datasets) {
    return <Loading />;
  }

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM DD",
          },
        },
      },
    },
  };

  return <Line data={ordensData} options={options} />;
}

export default LineChart;
