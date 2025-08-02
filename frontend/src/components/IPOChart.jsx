import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IPOChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "IPO Subscriptions",
        data: [30, 50, 40, 70, 60, 80],
        backgroundColor: "rgba(37, 99, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly IPO Subscriptions" },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
}
