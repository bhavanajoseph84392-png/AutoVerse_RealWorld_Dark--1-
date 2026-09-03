import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [rentalType, setRentalType] = useState("days");
  const [duration, setDuration] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");
  const [wished, setWished] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    api.get(`/cars/${id}`).then((res) => setCar(res.data)).catch(() => setMessage("Car not found."));
    if (user) api.get(`/wishlists?userId=${user.id}&carId=${id}`).then((res) => setWished(res.data.length > 0));
  }, [id]);

  if (!car) return <div className="page-container empty-state">{message || "Loading..."}</div>;

  const total = rentalType === "days" ? Number(car.dailyRate) * Number(duration) : Number(car.monthlyRate) * Number(duration);

  async function toggleWishlist() {
    if (!user) return alert("Please login first.");
    const res = await api.get(`/wishlists?userId=${user.id}&carId=${id}`);
    if (res.data.length) await api.delete(`/wishlists/${res.data[0].id}`); else await api.post("/wishlists", { userId: user.id, carId: id });
    setWished(!wished);
  }

  async function bookRental(e) {
    e.preventDefault();
    if (!user) return alert("Please login to rent a car.");
    if (!startDate) return setMessage("Please select a start date.");
    try {
      await api.post("/rentals", { userId: user.id, carId: car.id, carName: `${car.brand} ${car.model}`, rentalType, duration: Number(duration), startDate, total, status: "Confirmed", createdAt: new Date().toISOString() });
      setMessage(`Rental confirmed! Total: ₹${total.toLocaleString("en-IN")}`);
    } catch (error) { console.error(error); setMessage("Could not create rental."); }
  }

  return (
    <div className="details-page">
      <div className="details-image"><img src={car.image} alt={`${car.brand} ${car.model}`} /></div>
      <div className="details-info">
        <p className="eyebrow">{car.brand} • {car.year}</p>
        <h1>{car.model}</h1>
        <p className="details-description">{car.description}</p>
        <div className="details-specs"><span>⛽ {car.fuel}</span><span>⚙ {car.transmission}</span><span>👥 {car.seats} seats</span><span>🎨 {car.color}</span></div>
        <div className="feature-list"><h3>Highlights</h3>{car.features?.map((feature) => <span key={feature}>✓ {feature}</span>)}</div>
        <button className={`garage-button ${wished ? "active" : ""}`} onClick={toggleWishlist}>♡ {wished ? "Saved to My Dream Garage" : "Add to My Dream Garage"}</button>

        <form className="rental-box" onSubmit={bookRental}>
          <div className="rental-header"><div><p className="eyebrow">FLEXIBLE RENTAL</p><h2>Rent this car</h2></div>📅</div>
          <div className="rental-toggle"><button type="button" className={rentalType === "days" ? "selected" : ""} onClick={() => { setRentalType("days"); setDuration(3); }}>Few Days</button><button type="button" className={rentalType === "months" ? "selected" : ""} onClick={() => { setRentalType("months"); setDuration(1); }}>Months</button></div>
          <div className="rental-fields">
            <label>Start date<input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setStartDate(e.target.value)} required /></label>
            <label>{rentalType === "days" ? "Number of days" : "Number of months"}<input type="number" min="1" max={rentalType === "days" ? 30 : 12} value={duration} onChange={(e) => setDuration(e.target.value)} required /></label>
          </div>
          <div className="rental-total"><span>Estimated total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          <button className="primary-button full" type="submit">Confirm Rental</button>
          {message && <p className="success-message">{message}</p>}
        </form>
        <Link to="/cars" className="back-link">← Back to cars</Link>
      </div>
    </div>
  );
}

export default CarDetails;
