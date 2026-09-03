import { Link, NavLink } from "react-router-dom";
import { CarFront, Heart, KeyRound, LogIn, LogOut, Menu, Plus, UserRound, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={close}><span className="brand-mark"><CarFront size={19} /></span><span>Auto<span>Verse</span></span></Link>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      <nav className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={close}>Home</NavLink>
        <NavLink to="/cars" onClick={close}>Explore</NavLink>
        <NavLink to="/cars?category=SUV" onClick={close}>SUVs</NavLink>
        <NavLink to="/cars?brand=Jaguar" onClick={close}>Jaguar</NavLink>
        {user && <NavLink to="/wishlist" onClick={close}><Heart size={14} /> Garage</NavLink>}
        {user && <NavLink to="/rentals" onClick={close}><KeyRound size={14} /> Rentals</NavLink>}
        {user && <NavLink to="/add-car" onClick={close}><Plus size={14} /> Add Car</NavLink>}
      </nav>
      <div className="nav-auth">
        {user ? <><span className="welcome"><UserRound size={14} /> {user.name}</span><Link className="nav-button outline" to="/logout"><LogOut size={14} /> Logout</Link></> : <><Link className="nav-button outline" to="/login"><LogIn size={14} /> Login</Link><Link className="nav-button" to="/signup">Sign Up</Link></>}
      </div>
    </header>
  );
}
export default Navbar;
