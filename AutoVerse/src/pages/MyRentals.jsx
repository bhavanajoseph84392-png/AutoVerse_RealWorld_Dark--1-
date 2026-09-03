import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyRentals() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [rentals, setRentals] = useState([]);
  useEffect(() => { api.get(`/rentals?userId=${user.id}`).then((res) => setRentals(res.data.reverse())).catch(console.error); }, []);
  return <div className="page-container"><div className="page-heading"><div><p className="eyebrow">YOUR BOOKINGS</p><h1>My Rentals</h1><p>Track your active and past AutoVerse rentals.</p></div><Link className="primary-button" to="/cars">Rent Another Car</Link></div>{rentals.length ? <div className="rental-history">{rentals.map((rental) => <div className="rental-history-card" key={rental.id}><div><span className="status-badge">{rental.status}</span><h2>{rental.carName}</h2><p>Start: {rental.startDate}</p><p>{rental.duration} {rental.rentalType === "days" ? "day(s)" : "month(s)"}</p></div><div className="rental-price"><small>Total</small><strong>₹{Number(rental.total).toLocaleString("en-IN")}</strong></div></div>)}</div> : <div className="empty-state"><h2>No rentals yet</h2><p>Choose a car and book it for days or months.</p><Link className="primary-button" to="/cars">Explore Cars</Link></div>}</div>;
}
export default MyRentals;
