import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [cars, setCars] = useState([]);
  useEffect(() => { async function load() { const wishes = await api.get(`/wishlists?userId=${user.id}`); const result = await Promise.all(wishes.data.map((w) => api.get(`/cars/${w.carId}`).then((r) => r.data).catch(() => null))); setCars(result.filter(Boolean)); } load(); }, []);
  async function remove(carId) { const res = await api.get(`/wishlists?userId=${user.id}&carId=${carId}`); if (res.data.length) { await api.delete(`/wishlists/${res.data[0].id}`); setCars(cars.filter((car) => String(car.id) !== String(carId))); } }
  return <div className="page-container"><div className="page-heading"><div><p className="eyebrow">YOUR SAVED CARS</p><h1>My Dream Garage</h1><p>Cars you want to own, drive or rent later.</p></div>♡</div>{cars.length ? <div className="garage-grid">{cars.map((car) => <div className="garage-card" key={car.id}><img src={car.image} alt={car.model} /><div><p className="eyebrow">{car.brand}</p><h2>{car.model}</h2><p>₹{Number(car.dailyRate).toLocaleString("en-IN")}/day • ₹{Number(car.monthlyRate).toLocaleString("en-IN")}/month</p><div className="card-actions"><Link className="primary-button" to={`/cars/${car.id}`}>View & Rent</Link><button className="danger-button" onClick={() => remove(car.id)}>Remove</button></div></div></div>)}</div> : <div className="empty-state"><h2>Your garage is empty</h2><p>Save a car from Explore Cars to see it here.</p><Link className="primary-button" to="/cars">Explore Cars</Link></div>}</div>;
}
export default Wishlist;
