import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import HeaderLoginForm from "./HeaderLoginForm";
import logo from "../../assets/WatchedIt.webp";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { checkUserIsAdmin } from "../../redux/reducers/adminReducer";
import { loadNotificationCount } from "../../redux/reducers/notificationsReducer";
import BellIcon from "../Icons/BellIcon";
import PersonIcon from "../Icons/PersonIcon";
import EnterIcon from "../Icons/EnterIcon";

function Header() {
  const dispatch: AppDispatch = useAppDispatch();
  const userIsAuthenticated = useAppSelector(
    (state) => state.authentication.tokens != null,
  );
  const notificationCount = useAppSelector(
    (state) => state.notifications.count,
  );
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserIsAdmin());
  }, [userIsAuthenticated, dispatch]);

  useEffect(() => {
    setMobileIsOpen(false);
    if (userIsAuthenticated) dispatch(loadNotificationCount());
  }, [location, userIsAuthenticated, dispatch]);

  function toggleMobileNavigation() {
    setMobileIsOpen(!mobileIsOpen);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-backgroundOffset px-4 py-2 shadow-lg">
      <div className="flex items-center flex-shrink-0 text-white lg:mr-6 mx-auto">
        <Link to="/" className="tracking-tight" aria-label="To home">
          <img
            src={logo}
            alt="Watched it logo"
            className="w-32 h-full text-center"
          />
        </Link>
      </div>
      <div className="block md:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:border-white pointer"
          onClick={toggleMobileNavigation}
        >
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
      <div
        className={`${
          mobileIsOpen ? "block" : "hidden"
        } w-full flex-grow md:flex md:items-center md:w-auto`}
      >
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
            to="/news"
            className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
          >
            News
          </Link>
          <Link
            to="/lists"
            className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
          >
            Lists
          </Link>
          <Link
            to="/games"
            className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
          >
            Games
          </Link>
          <Link
            to="/community"
            className="block mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4"
          >
            Community
          </Link>
        </div>
        <div className="border-t mt-2 md:border-0 md:mt-0 text-center md:text-left">
          {!userIsAuthenticated && (
            <>
              <div className="hidden lg:block">
                <HeaderLoginForm />
              </div>
              <div className="blog lg:hidden my-2 md:my-0">
                <Link
                  to="/login"
                  className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                >
                  <EnterIcon color="white" height={5} width={5} />
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
                <BellIcon color="primary" height={6} width={6} />
                {notificationCount > 0 && (
                  <span className="ml-1">{notificationCount}</span>
                )}
              </Link>
              <Link
                to="/profile"
                className="mt-4 md:inline-block md:mt-0 text-primary hover:opacity-75 md:mx-4 inline-flex items-center"
              >
                <PersonIcon
                  color="primary"
                  height={6}
                  width={6}
                  strokeWidth={1.5}
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
