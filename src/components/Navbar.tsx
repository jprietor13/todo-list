import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar-container">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `link ${isActive ? "active" : ""}`}
          >
            Proyectos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `link ${isActive ? "active" : ""}`}
          >
            Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
