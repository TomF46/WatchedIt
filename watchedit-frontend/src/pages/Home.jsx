import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { login } from "../redux/actions/authenticationActions";
import { useNavigate } from 'react-router-dom';

function Home({login, userIsAuthenticated}) {
  const navigate = useNavigate();

  function handleLogin(){
   let payload = {
    email: "tom@email.com",
    password: "Password123!"
   };

   login(payload).then(() => {
    navigate("/films");
   }).catch(err => {
    console.log(err);
    alert(err);
   })
  }

  return (
    <div className="Home">
      {/* <div className="p-8 bg-backgroundOffset">
        <button onClick={() => handleLogin()} className="p-4 bg-primary">
          Login
        </button>
      </div> */}
    </div>
  )
}

Home.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

