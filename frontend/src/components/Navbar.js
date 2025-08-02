import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white p-4 shadow-md flex justify-between"
    >
      <h1 className="text-xl font-bold">IPO Dashboard</h1>
      <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">
        Logout
      </button>
    </motion.nav>
  );
}
