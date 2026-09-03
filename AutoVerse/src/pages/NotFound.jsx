import { Link } from "react-router-dom";
function NotFound() { return <div className="empty-state full-page"><h1>404</h1><h2>Road not found</h2><p>The page you're looking for doesn't exist.</p><Link className="primary-button" to="/">Back Home</Link></div>; }
export default NotFound;
