import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-60 h-screen shadow-md fixed left-0 top-0 p-4 flex flex-col"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-6">IPO Menu</h2>
      <nav className="flex flex-col gap-4">
        <a href="/" className="hover:text-blue-600">Dashboard</a>
        <a href="/ipos" className="hover:text-blue-600">IPO List</a>
        <a href="/reports" className="hover:text-blue-600">Reports</a>
        <a href="/settings" className="hover:text-blue-600">Settings</a>
      </nav>
    </motion.aside>
  );
}
