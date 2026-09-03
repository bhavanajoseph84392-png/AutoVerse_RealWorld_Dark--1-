import { Link } from "react-router-dom";
import { CalendarDays, Fuel, Heart, Pencil, Trash2, Users, Zap } from "lucide-react";
import api from "../services/api";

function formatPrice(value) { return `₹${Number(value).toLocaleString("en-IN")}`; }
function budgetLabel(price) { const p = Number(price); if (p <= 600000) return "₹4–6L"; if (p <= 900000) return "₹6–9L"; if (p <= 1300000) return "₹9–13L"; return "₹13L+"; }
function CarCard({ car, wished, onWishlistChange, onDelete }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  async function toggleWishlist() { if (!user) return alert("Please login to use My Dream Garage."); try { const response = await api.get(`/wishlists?userId=${user.id}&carId=${car.id}`); if (response.data.length) await api.delete(`/wishlists/${response.data[0].id}`); else await api.post("/wishlists", { userId: user.id, carId: car.id }); onWishlistChange?.(); } catch (error) { console.error(error); } }
  async function handleDelete() { if (!confirm(`Delete ${car.brand} ${car.model}?`)) return; try { await api.delete(`/cars/${car.id}`); onDelete?.(car.id); } catch (error) { console.error(error); } }
  return (
    <article className="car-card">
      <div className="car-image-wrap"><img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image" /><div className="image-badges"><span className="category-badge">{car.category}</span><span className="budget-badge">{budgetLabel(car.price)}</span></div><button className={`heart-button ${wished ? "active" : ""}`} onClick={toggleWishlist} title="My Dream Garage"><Heart size={17} fill={wished ? "currentColor" : "none"} /></button></div>
      <div className="car-content"><div className="car-title-row"><div><p className="eyebrow">{car.brand}</p><h3>{car.model}</h3></div><span className="year">{car.year}</span></div>
        <div className="spec-grid"><span><Fuel size={14} /> {car.fuel}</span><span><Zap size={14} /> {car.transmission}</span><span><Users size={14} /> {car.seats} seats</span><span><CalendarDays size={14} /> {car.color}</span></div>
        <div className="purchase-price"><span>Purchase from</span><strong>{formatPrice(car.price)}</strong></div>
        <div className="rental-price-row"><div><small>Short rental</small><strong>{formatPrice(car.dailyRate)}<em>/day</em></strong></div><div><small>Monthly rental</small><strong>{formatPrice(car.monthlyRate)}<em>/month</em></strong></div></div>
        <div className="card-actions"><Link className="primary-button" to={`/cars/${car.id}`}>View & Rent</Link>{user && <Link className="icon-button" to={`/edit-car/${car.id}`} title="Edit"><Pencil size={15} /></Link>}{user && <button className="icon-button danger" onClick={handleDelete} title="Delete"><Trash2 size={15} /></button>}</div>
      </div>
    </article>
  );
}
export default CarCard;
