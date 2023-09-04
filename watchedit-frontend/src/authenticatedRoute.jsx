import PropTypes from "prop-types";
import {Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";

const AuthenticatedRoute = ({children
}) => {
    const userIsAuthenticated = useSelector((state) => state.tokens != null);
    if (!userIsAuthenticated) {
        return <Navigate to="/login" replace />;
      }
    
      return children;
};

AuthenticatedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthenticatedRoute;
