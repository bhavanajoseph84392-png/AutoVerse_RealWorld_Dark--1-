import { useEffect } from "react";
function Logout() { useEffect(() => { localStorage.removeItem("user"); window.location.href = "/"; }, []); return null; }
export default Logout;
