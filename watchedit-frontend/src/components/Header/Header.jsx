import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/authenticationActions";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderLoginForm from "./HeaderLoginForm";
import { checkUserIsAdmin } from "../../redux/actions/isAdminActions";
import { loadNotificationCount } from "../../redux/actions/notificationCountActions";
import logo from "../../assets/WatchedIt.webp"

function Header({ login, checkUserIsAdmin , userIsAuthenticated, notificationCount,loadNotificationCount }) {
  const [mobileIsOpen, setMobileIsOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

    useEffect(() => {
        checkUserIsAdmin();
    }, [userIsAuthenticated])

  useEffect(() => {
    setMobileIsOpen(false);
    loadNotificationCount();
  }, [location]);

  function toggleMobileNavigation() {
    setMobileIsOpen(!mobileIsOpen);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-backgroundOffset px-4 py-2 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-white md:mr-6 mx-auto">
                <Link to="/" className="tracking-tight" aria-label="To home">
                    <img src={logo} alt="Watched it logo"  className="w-32 h-full text-center" />
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
                <div className="text-sm md:flex-grow py-4 text-center md:text-left">
                    <Link
                        to="/"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
                    >
                        Home
                    </Link>
                    <Link
                        to="/films"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
                    >
                        Films
                    </Link>
                    <Link
                        to="/people"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
                    >
                        People
                    </Link>
                    <Link
                        to="/lists"
                        className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
                    >
                        Lists
                    </Link>
                </div>
                <div className="border-t mt-2 md:border-0 md:mt-0 text-center md:text-left">
                    {!userIsAuthenticated && (
                        <>
                            <div className="hidden lg:block">
                                <HeaderLoginForm  />
                            </div>
                            <div className="blog lg:hidden my-2 md:my-0">
                                <Link
                                    to="/login"
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="ml-1">Login</span>
                                </Link>
                            </div>
                        </>
                    )}
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/notifications"
                                className="text-primary text-sm md:px-4 md:py-2 md:leading-none md:hover:shadow hover:opacity-75 mt-4 md:mt-0 inline-flex items-center mr-2"
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {notificationCount > 0 && (<span className="ml-1">{notificationCount}</span>)}
                            </Link>
                            <Link
                                to="/profile"
                                className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4 inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
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
  isAdmin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  notificationCount: PropTypes.number.isRequired,
  loadNotificationCount: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    userIsAuthenticated: state.tokens != null,
    isAdmin: state.isAdmin,
    notificationCount: state.notificationCount
  };
};

const mapDispatchToProps = {
    checkUserIsAdmin,
    login,
    loadNotificationCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
