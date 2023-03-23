import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/authenticationActions";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderLoginForm from "./HeaderLoginForm";

function Header({ login, userIsAuthenticated }) {
  const [mobileIsOpen, setMobileIsOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileIsOpen(false);
  }, [location]);

  function toggleMobileNavigation() {
    setMobileIsOpen(!mobileIsOpen);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-backgroundOffset px-4 py-2 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/" className="tracking-tight" aria-label="To home">
                    
                </Link>
            </div>
            <div className="block md:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:border-white pointer" onClick={toggleMobileNavigation}>
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`${mobileIsOpen ? "block" : "hidden"} w-full flex-grow md:flex md:items-center md:w-auto`}>
                <div className="text-sm md:flex-grow py-4">
                    <Link
                        to="/"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:text-secondary md:mx-4"
                    >
                        Home
                    </Link>
                    <Link
                        to="/films"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:text-secondary md:mx-4"
                    >
                        Films
                    </Link>
                    <Link
                        to="/people"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:text-secondary md:mx-4"
                    >
                        People
                    </Link>
                </div>
                <div className="border-t mt-2 md:border-0 md:mt-0">
                    {!userIsAuthenticated && (
                        <>
                            <HeaderLoginForm  />
                        </>
                    )}
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/profile"
                                className="block mt-4 md:inline-block md:mt-0 text-primary hover:text-secondary md:mx-4"
                            >
                                Profile
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
  );
}

Header.propTypes = {
  userIsAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    userIsAuthenticated: state.tokens != null,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
