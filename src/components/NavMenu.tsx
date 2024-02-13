import { Link } from "react-router-dom";
import "../css/NavMenu.css";

const NavMenu = () => {
  return (
    <nav>
      <ul className="nav">
        <li>
          <Link to="/">Lookup
            <i className="fas fa-home fa-3x home">
              <div className="circle"></div>
            </i>
            <div className="title"></div>
          </Link>
        </li>

        <li>
          <Link to="/items">All Items
            <i className="fab fa-twitter fa-3x twitter">
              <div className="circle"></div>
            </i>
            <div className="title"></div>
          </Link>
        </li>

        <li>
          <Link to="/additem">Add Item
            <i className="fab fa-codepen fa-3x codepen">
              <div className="circle"></div></i>
            <div className="title"></div>
          </Link>
        </li>

        <li>
          <Link to="/">TBD
            <i className="fab fa-github fa-3x github">
              <div className="circle"></div></i>
            <div className="title"></div>
          </Link>
        </li>
        <div className="background"></div>

      </ul>
    </nav>
  )
}

export default NavMenu;