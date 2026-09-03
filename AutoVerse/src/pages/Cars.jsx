import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpDown, CarFront, SlidersHorizontal } from "lucide-react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import SearchFilter from "../components/SearchFilter";

function Cars() {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState({ search: "", brand: searchParams.get("brand") || "", category: searchParams.get("category") || "", fuel: "", transmission: "", minPrice: searchParams.get("minPrice") || "", maxPrice: searchParams.get("maxPrice") || "" });
  const user = JSON.parse(localStorage.getItem("user") || "null");

  async function loadCars() {
    try { const response = await api.get("/cars"); setCars(response.data); if (user) { const wishes = await api.get(`/wishlists?userId=${user.id}`); setWishlistIds(wishes.data.map((item) => String(item.carId))); } }
    catch (error) { console.error(error); } finally { setLoading(false); }
  }
  useEffect(() => { loadCars(); }, []);

  const brands = useMemo(() => [...new Set(cars.map((car) => car.brand))].sort(), [cars]);
  const filteredCars = useMemo(() => {
    const result = cars.filter((car) => { const q = filters.search.toLowerCase(); const matchesSearch = !q || [car.brand, car.model, car.category, car.fuel].some((v) => String(v).toLowerCase().includes(q)); return matchesSearch && (!filters.brand || car.brand === filters.brand) && (!filters.category || car.category === filters.category) && (!filters.fuel || car.fuel === filters.fuel) && (!filters.transmission || car.transmission === filters.transmission) && (!filters.minPrice || Number(car.price) >= Number(filters.minPrice)) && (!filters.maxPrice || Number(car.price) <= Number(filters.maxPrice)); });
    if (sort === "price-low") result.sort((a, b) => a.price - b.price); if (sort === "price-high") result.sort((a, b) => b.price - a.price); if (sort === "rental-low") result.sort((a, b) => a.dailyRate - b.dailyRate); if (sort === "year-new") result.sort((a, b) => b.year - a.year); return result;
  }, [cars, filters, sort]);
  const reset = () => setFilters({ search: "", brand: "", category: "", fuel: "", transmission: "", minPrice: "", maxPrice: "" });
  return (
    <div className="page-container cars-page">
      <div className="page-heading"><div><p className="eyebrow">THE AUTOVERSE COLLECTION</p><h1>Find your next drive.</h1><p>From first cars to flagship SUVs. Buy it, save it, or rent it.</p></div><Link className="primary-button" to="/add-car"><CarFront size={16} /> Add New Car</Link></div>
      <SearchFilter filters={filters} setFilters={setFilters} brands={brands} onReset={reset} />
      <div className="results-toolbar"><div><strong>{filteredCars.length} cars</strong><span>{filters.brand ? ` • ${filters.brand}` : " • All brands"}{filters.category ? ` • ${filters.category}` : ""}</span></div><label><ArrowUpDown size={14} /> Sort <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="year-new">Newest first</option><option value="price-low">Purchase: low to high</option><option value="price-high">Purchase: high to low</option><option value="rental-low">Rental: low to high</option></select></label></div>
      {loading ? <div className="empty-state">Loading the collection...</div> : filteredCars.length ? <div className="car-grid">{filteredCars.map((car) => <CarCard key={car.id} car={car} wished={wishlistIds.includes(String(car.id))} onWishlistChange={loadCars} onDelete={(id) => setCars((prev) => prev.filter((c) => String(c.id) !== String(id)))} />)}</div> : <div className="empty-state"><SlidersHorizontal size={26} /><h2>No cars in this selection</h2><p>Try another budget, brand or body style.</p><button className="primary-button" onClick={reset}>Show all cars</button></div>}
    </div>
  );
}
export default Cars;
