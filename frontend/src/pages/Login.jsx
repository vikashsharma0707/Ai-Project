// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, fetchMe } from "../store/userSlice.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loginAs, setLoginAs] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert("Please fill all fields");

    setLoading(true);
    try {
      await dispatch(loginUser(form)).unwrap();
      const me = await dispatch(fetchMe()).unwrap();

      if (loginAs === "admin" && me.role !== "admin") {
        alert("This account is not an Admin account.");
      } else {
        alert("Login Successful!");
        navigate(me.role === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      alert(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>

        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setLoginAs("user")}
            className={`px-6 py-2 rounded-full font-medium ${loginAs === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            User
          </button>
          <button
            onClick={() => setLoginAs("admin")}
            className={`px-6 py-2 rounded-full font-medium ${loginAs === "admin" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Demo Admin: <b>admin@myntra.demo</b> / <b>admin123</b>
        </p>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}