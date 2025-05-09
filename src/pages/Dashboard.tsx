import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Summary = {
  leads: number;
  clients: number;
  quotations: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<Summary>({ leads: 0, clients: 0, quotations: 0 });

  useEffect(() => {
    // Simulate fetching summary from API
    setTimeout(() => {
      setSummary({
        leads: 42,
        clients: 15,
        quotations: 23,
      });
    }, 500);
  }, []);

  const chartData = {
    labels: ["Leads", "Clients", "Quotations"],
    datasets: [
      {
        label: "Total Count",
        data: [summary.leads, summary.clients, summary.quotations],
        backgroundColor: ["#60a5fa", "#34d399", "#fbbf24"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "CRM Summary Chart" },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Leads" count={summary.leads} color="bg-blue-100 text-blue-700" />
        <SummaryCard title="Clients" count={summary.clients} color="bg-green-100 text-green-700" />
        <SummaryCard title="Quotations" count={summary.quotations} color="bg-yellow-100 text-yellow-700" />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const SummaryCard = ({ title, count, color }: { title: string; count: number; color: string }) => (
  <div className={`p-4 rounded shadow ${color}`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
