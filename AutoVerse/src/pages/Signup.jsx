import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  async function submit(e) { e.preventDefault(); try { const exists = await api.get(`/users?email=${encodeURIComponent(form.email)}`); if (exists.data.length) return setError("An account with this email already exists."); await api.post("/users", form); alert("Account created. Please login."); navigate("/login"); } catch { setError("Cannot connect to the server. Run npm run server."); } }
  return <div className="auth-page"><div className="auth-card"><p className="eyebrow">JOIN AUTOVERSE</p><h1>Create your account</h1><p>Save cars, manage rentals and build your dream garage.</p><form onSubmit={submit}><label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label>Password<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>{error && <p className="error-message">{error}</p>}<button className="primary-button full">Create Account</button></form><p>Already registered? <Link to="/login">Login</Link></p></div></div>;
}
export default Signup;
