import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Home({login, userIsAuthenticated}) {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <p>Home page</p>
    </div>
  )
}

Home.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};


export default connect(mapStateToProps)(Home);

