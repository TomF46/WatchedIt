import PropTypes from "prop-types";
import {Navigate} from 'react-router-dom';
import { connect } from "react-redux";

const AuthenticatedRoute = ({userIsAuthenticated, children
}) => {
    if (!userIsAuthenticated) {
        return <Navigate to="/login" replace />;
      }
    
      return children;
};

AuthenticatedRoute.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

const mapStateToProps = (state) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
