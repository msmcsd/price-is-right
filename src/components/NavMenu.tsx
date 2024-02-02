import { Link } from "react-router-dom";
import "../css/NavMenu.css";

const NavMenu = () => {
  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="/allitems">All Items</Link></li>
        <li><Link to="/">Lookup Item</Link></li>
        <li><Link to="/additem">Add Item</Link></li>
      </ul>
    </nav>
  )
}

export default NavMenu;