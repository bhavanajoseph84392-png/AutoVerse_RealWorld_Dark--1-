import { Search, SlidersHorizontal, X } from "lucide-react";

const budgetOptions = [
  ["400000-600000", "₹4 – 6 lakh"],
  ["600001-900000", "₹6 – 9 lakh"],
  ["900001-1300000", "₹9 – 13 lakh"],
  ["1300001-999999999", "₹13 – 20 lakh or more"],
];

function SearchFilter({ filters, setFilters, brands, onReset }) {
  const set = (name, value) => setFilters({ ...filters, [name]: value });
  return (
    <section className="filter-panel">
      <div className="filter-top"><div className="search-box"><Search size={18} /><input value={filters.search} onChange={(e) => set("search", e.target.value)} placeholder="Search brand, model, fuel or body style..." /></div><span className="filter-label"><SlidersHorizontal size={14} /> Refine your drive</span></div>
      <div className="filter-selects">
        <select value={filters.brand} onChange={(e) => set("brand", e.target.value)}><option value="">All Brands</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select>
        <select value={filters.category} onChange={(e) => set("category", e.target.value)}><option value="">All Categories</option><option>Hatchback</option><option>Compact SUV</option><option>Sedan</option><option>SUV</option><option>Electric</option><option>Luxury</option><option>Performance</option></select>
        <select value={filters.fuel} onChange={(e) => set("fuel", e.target.value)}><option value="">Any Fuel</option><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></select>
        <select value={filters.transmission} onChange={(e) => set("transmission", e.target.value)}><option value="">Any Transmission</option><option>Automatic</option><option>Manual</option></select>
        <select value={`${filters.minPrice || ""}-${filters.maxPrice || ""}`} onChange={(e) => { const [min, max] = e.target.value.split("-"); setFilters({ ...filters, minPrice: min || "", maxPrice: max || "" }); }}><option value="-">Any Budget</option>{budgetOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <button className="clear-button" onClick={onReset}><X size={15} /> Clear</button>
      </div>
      <div className="filter-hint">Purchase-price bands match the four AutoVerse budget zones • Rental pricing is displayed on every listing</div>
    </section>
  );
}
export default SearchFilter;
