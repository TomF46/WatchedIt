import React from "react";
import {Navigate} from 'react-router-dom';
import { connect } from "react-redux";

const AuthenticatedRoute = ({userIsAuthenticated, children
}) => {
    if (!userIsAuthenticated) {
        return <Navigate to="/login" replace />;
      }
    
      return children;
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
