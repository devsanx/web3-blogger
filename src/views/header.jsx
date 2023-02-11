import { useContext } from "react";
import { MetamaskContext } from "../contexts/metamask";
import { Link } from "react-router-dom";

const Header = () => {
  const metamask = useContext(MetamaskContext);

  const logout = () => {
    metamask.disconnectWallet();
  };

  const login = () => {
    metamask.connectWallet();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Blockchain Blogs</span>
        <div>
          <Link to="/help" className="btn btn-link mx-2">
            Help?
          </Link>
          {metamask.wallet ? (
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={login}>
              Login With Metamask
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
