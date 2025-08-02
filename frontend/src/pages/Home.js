import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Home() {
  const [ipos, setIpos] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/ipos/")
      .then((response) => setIpos(response.data))
      .catch((error) => console.error("Error fetching IPOs:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">IPO Listings</h2>

      {ipos.length === 0 ? (
        <p className="text-center text-gray-500">No IPOs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ipos.map((ipo) => (
            <motion.div
              key={ipo.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-blue-700">{ipo.name}</h3>
              <p className="text-gray-600">{ipo.company}</p>
              <p className="mt-2 text-sm text-gray-500">Price Band: {ipo.price_band}</p>
              <p className="text-sm text-gray-500">Lot Size: {ipo.lot_size}</p>
              <p className="text-sm text-gray-500">
                Issue: {ipo.issue_date} to {ipo.close_date}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
