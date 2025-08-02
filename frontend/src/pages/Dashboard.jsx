import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import IPOChart from "../components/IPOChart";
export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Navbar />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Upcoming IPOs" value="12" />
          <Card title="Active IPOs" value="5" />
          <Card title="Closed IPOs" value="8" />
        </div>
        <div className="p-6">
          <IPOChart />
        </div>
      </div>
    </div>
  );
}
