import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  async function submit(e) { e.preventDefault(); try { const res = await api.get(`/users?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`); if (!res.data.length) return setError("Invalid email or password."); localStorage.setItem("user", JSON.stringify(res.data[0])); window.location.href = "/"; } catch { setError("Cannot connect to the server. Run npm run server."); } }
  return <div className="auth-page"><div className="auth-card"><p className="eyebrow">WELCOME BACK</p><h1>Sign in to AutoVerse</h1><p>Access your dream garage, rentals and showroom tools.</p><form onSubmit={submit}><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>{error && <p className="error-message">{error}</p>}<button className="primary-button full" type="submit">Login</button></form><p>New to AutoVerse? <Link to="/signup">Create an account</Link></p><div className="demo-login">Demo: demo@autoverse.com / demo123</div></div></div>;
}
export default Login;
