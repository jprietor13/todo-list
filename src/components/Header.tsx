import { useState, useEffect } from "react";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  return (
    <header className="header-container mt-4">
      <h2>TODO-LIST</h2>

      <button
        className="btn btn-outline-secondary"
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? (
          <i className="bi bi-brightness-low-fill"></i>
        ) : (
          <i className="bi bi-moon-stars-fill"></i>
        )}
      </button>
    </header>
  );
};
