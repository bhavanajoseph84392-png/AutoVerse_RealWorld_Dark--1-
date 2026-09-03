import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const blank = { brand: "", model: "", year: new Date().getFullYear(), category: "Hatchback", fuel: "Petrol", transmission: "Manual", seats: 5, color: "", price: "", dailyRate: "", monthlyRate: "", image: "", description: "", featuresText: "" };
function budgetFromPrice(price) { const p = Number(price); if (p <= 600000) return "₹4 – 6 lakh"; if (p <= 900000) return "₹6 – 9 lakh"; if (p <= 1300000) return "₹9 – 13 lakh"; return "₹13 – 20 lakh or more"; }
function CarForm({ mode, initialData }) {
  const navigate = useNavigate(); const [form, setForm] = useState(initialData ? { ...initialData, featuresText: (initialData.features || []).join(", ") } : blank); const [error, setError] = useState("");
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) { e.preventDefault(); setError(""); const payload = { ...form, year: Number(form.year), seats: Number(form.seats), price: Number(form.price), dailyRate: Number(form.dailyRate), monthlyRate: Number(form.monthlyRate), budgetRange: budgetFromPrice(form.price), features: form.featuresText.split(",").map((x) => x.trim()).filter(Boolean) }; delete payload.featuresText; try { if (mode === "edit") await api.put(`/cars/${initialData.id}`, payload); else await api.post("/cars", payload); navigate("/cars"); } catch (err) { console.error(err); setError("Could not save car. Make sure JSON Server is running."); } }
  return <div className="form-page"><div className="form-heading"><p className="eyebrow">CAR INVENTORY</p><h1>{mode === "edit" ? "Refine your listing" : "Add a new car"}</h1><p>Purchase price automatically places the car into one of AutoVerse's four budget zones.</p></div><form className="car-form" onSubmit={submit}>
    {[['brand','Brand'],['model','Model'],['year','Year'],['color','Color'],['price','Purchase Price (₹)'],['dailyRate','Daily Rental Rate (₹)'],['monthlyRate','Monthly Rental Rate (₹)'],['image','Image URL']].map(([name,label]) => <label key={name}>{label}<input name={name} value={form[name]} onChange={change} required /></label>)}
    <label>Category<select name="category" value={form.category} onChange={change}><option>Hatchback</option><option>Compact SUV</option><option>Sedan</option><option>SUV</option><option>Electric</option><option>Luxury</option><option>Performance</option></select></label>
    <label>Fuel<select name="fuel" value={form.fuel} onChange={change}><option>Petrol</option><option>Diesel</option><option>Electric</option></select></label>
    <label>Transmission<select name="transmission" value={form.transmission} onChange={change}><option>Automatic</option><option>Manual</option></select></label><label>Seats<input type="number" min="1" max="12" name="seats" value={form.seats} onChange={change} required /></label>
    <div className="budget-preview full-field"><span>AutoVerse budget zone</span><strong>{form.price ? budgetFromPrice(form.price) : "Enter purchase price"}</strong></div>
    <label className="full-field">Description<textarea name="description" value={form.description} onChange={change} required /></label><label className="full-field">Features <small>Comma separated</small><input name="featuresText" value={form.featuresText} onChange={change} placeholder="Sunroof, 360 Camera, Premium Audio" /></label>
    {error && <p className="error-message full-field">{error}</p>}<div className="form-actions full-field"><button type="submit" className="primary-button">{mode === "edit" ? "Update Car" : "Add Car"}</button><button type="button" className="secondary-button" onClick={() => navigate("/cars")}>Cancel</button></div>
  </form></div>;
}
export default CarForm;
