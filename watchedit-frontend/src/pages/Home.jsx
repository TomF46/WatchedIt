import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FilmReel from "../components/Home/FilmReel/FilmReel";
import PeopleReel from "../components/Home/PeopleReel/PeopleReel";
import ListReel from "../components/Home/ListReel/ListReel";
import logo from "../assets/WatchedIt.webp"


function Home({ userIsAuthenticated, username }) {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <div className="text-center grid grid-cols-12">
                <div className="col-span-12 md:col-span-6 md:col-start-4">
                    <img src={logo} alt="Watched it logo"/>
                </div>
            </div>
            {userIsAuthenticated ? (
                <p className="text-center text-primary text-4xl mt-4">Welcome {username}</p>
            ) : (
                <div className="text-center">
                    <p className="text-center text-primary text-4xl my-4 font-bold">Sign up now for reviews, rating and more.</p>
                    <Link
                        to={"/register"}
                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                    >
                        Register
                    </Link>
                </div>
            )}
            <div className="home-conent grid grid-col-12">
                <div className="col-span-12">
                    <FilmReel />
                </div>
                <div className="col-span-12">
                    <PeopleReel />
                </div>
                <div className="col-span-12">
                    <ListReel />
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        username: state.tokens ? state.tokens.username : null
    };
};

export default connect(mapStateToProps)(Home);
