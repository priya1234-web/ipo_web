import React, { useEffect, useState } from "react";
import { fetchIPOs, createIPO } from "../api";

function IPOList() {
  const [ipos, setIpos] = useState([]);
  const [form, setForm] = useState({
    company_name: "",
    issue_date: "",
    price: "",
    lot_size: "",
    status: "upcoming",
  });

  // Fetch IPOs when component loads
  useEffect(() => {
    fetchIPOs()
      .then(setIpos)
      .catch((err) => console.error("Error fetching IPOs:", err));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newIPO = await createIPO(form);
      setIpos([...ipos, newIPO]); // Add new IPO to list
      setForm({
        company_name: "",
        issue_date: "",
        price: "",
        lot_size: "",
        status: "upcoming",
      }); // Reset form
    } catch (error) {
      console.error("Error creating IPO:", error);
    }
  };

  return (
    <div>
      <h2>IPO List</h2>
      <ul>
        {ipos.map((ipo) => (
          <li key={ipo.id}>
            {ipo.company_name} - {ipo.price} ₹
          </li>
        ))}
      </ul>

      <h3>Add IPO</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Company Name"
          value={form.company_name}
          onChange={(e) => setForm({ ...form, company_name: e.target.value })}
        />
        <input
          placeholder="Issue Date (YYYY-MM-DD)"
          value={form.issue_date}
          onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Lot Size"
          value={form.lot_size}
          onChange={(e) => setForm({ ...form, lot_size: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit">Add IPO</button>
      </form>
    </div>
  );
}

export default IPOList;
