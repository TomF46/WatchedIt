import PropTypes from "prop-types";
import { Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const AuthenticatedRoute = ({ children } : RouteProps) => {
  const userIsAuthenticated = useSelector((state : RootState) => state.tokens != null);
  if (!userIsAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedRoute;
