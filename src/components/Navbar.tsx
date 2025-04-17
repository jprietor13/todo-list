import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar-container">
      <ul>
        <li>
          <Link to="/">Proyectos</Link>
        </li>
        <li>
          <Link to="/tasks">Tareas</Link>
        </li>
      </ul>
    </nav>
  );
};
