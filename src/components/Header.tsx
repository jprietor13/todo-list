import logo from "../images/logo.png";

export const Header = () => {
  return (
    <header className="header-container">
      <img src={logo} alt="logo" />
      <h1>TODO-LIST-APP</h1>
    </header>
  );
};
