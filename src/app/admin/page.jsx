"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    discount: "",
    expiryDate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  async function fetchCoupons() {
    try {
      const response = await axios.get("/api/admin/get-coupons");
      setCoupons(response.data.coupons || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/admin/add", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response:", response.data.coupon);
      
      toast.success("Coupon added successfully!");
      fetchCoupons();
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
    setFormData({ title: "", description: "", code: "", discount: "", expiryDate: "" });
  }

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Add Coupon Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md my-4">
        <h2 className="text-lg font-semibold">Add New Coupon</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" required className="p-2 border" onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" required className="p-2 border" onChange={handleChange} />
          <input type="text" name="code" placeholder="Coupon Code" required className="p-2 border" onChange={handleChange} />
          <input type="number" name="discount" placeholder="Discount %" required className="p-2 border" onChange={handleChange} />
          <input type="date" name="expiryDate" required className="p-2 border" onChange={handleChange} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md cursor-pointer">Add Coupon</button>
      </form>
      {message && <p className="text-red-500">{message}</p>}

      {/* List of Coupons */}
      <h2 className="text-lg font-semibold mt-6">All Coupons</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          <ul className="divide-y">
            {coupons.map((coupon) => (
              <li key={coupon._id} className="p-2">
                <strong>{coupon.title}</strong> - {coupon.description} - <span className="text-blue-600">{coupon.code}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
