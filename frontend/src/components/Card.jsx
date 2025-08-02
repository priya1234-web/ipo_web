import { motion } from "framer-motion";

export default function Card({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg"
    >
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </motion.div>
  );
}
