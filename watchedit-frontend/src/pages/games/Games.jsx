import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Games({userIsAuthenticated}){
    const navigate = useNavigate();
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
                <div className="grid grid-cols-12">
                    <div className="col-span-12 bg-backgroundOffset shadow rounded">
                        <div className="grid grid-cols-12">
                            <div className="col-span-10 p-4">
                                <Link to={"/games/filmFromCast"} className="text-primary text-center text-xl">Guess film from cast</Link>
                                <p>Using cast member clues guess the film they all appeared or worked on together.</p>
                            </div>
                            <div onClick={() => {navigate(`/games/filmFromCast`)}} className="col-span-2 bg-primary flex items-center justify-center cursor-pointer">
                                <p>Play now</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 mt-4">
                        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded">
                            <div className="col-span-10 p-4">
                                <Link to={"/games/filmFromDescription"} className="text-primary text-center text-xl">Guess film from description</Link>
                                <p>Guess as many films as you can in a row using just a description.</p>
                            </div>
                            <div onClick={() => {navigate(`/games/filmFromDescription`)}} className="col-span-2 bg-primary flex items-center justify-center cursor-pointer">
                                <p>Play now</p>
                            </div>
                        </div>
                    </div>
                </div>
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