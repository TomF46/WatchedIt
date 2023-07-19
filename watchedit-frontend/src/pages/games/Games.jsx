import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Games({userIsAuthenticated}){
    return (
        <div className="games-page">
            <h1 className="text-center text-primary text-4xl my-4 font-bold">
                Games
            </h1>
            {!userIsAuthenticated && (
                <div className="text-center">
                    <p className="text-center text-primary text-lg my-4 font-bold">Games are only available for logged in users, register now to play!</p>
                    <Link
                        to={"/register"}
                        className="bg-primary text-white rounded py-2 px-4 mt-4 hover:opacity-75"
                    >
                        Register
                    </Link>
                </div>
            )}
            <div className="my-4">
                <Link to={"/games/filmFromCast"} className="text-primary">Guess film from cast</Link>
            </div>
        </div>
    );
}

Games.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        userIsAuthenticated: state.tokens != null,
    };
};

export default connect(mapStateToProps)(Games);
