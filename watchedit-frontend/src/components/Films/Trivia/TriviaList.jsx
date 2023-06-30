import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const TriviaList = ({trivia, userId, onRemove, canControl}) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {trivia.map((triviaItem) => {
                return (
                    <div key={triviaItem.id} className="col-span-12 my-2">
                        <div className="grid grid-cols-24">
                            <div className={`${canControl && triviaItem.user.id == userId ? "col-span-16 md:col-span-20" : "col-span-24"} p-4 bg-backgroundOffset shadow rounded`}>
                                <p>{triviaItem.text}</p>
                                <Link className="text-primary hover:opacity-75" to={`/profile/${triviaItem.user.id}`}>- {triviaItem.user.username}</Link>
                            </div>
                            {canControl && triviaItem.user.id == userId &&(
                                <>
                                    <div className="col-span-4 md:col-span-2 pl-1">
                                        <button onClick={() => navigate(`/films/${triviaItem.film.id}/trivia/${triviaItem.id}/edit`)} className="w-full h-full text-sm bg-primary hover:opacity-75 rounded">Edit</button>
                                    </div>
                                    <div className="col-span-4 md:col-span-2 pl-1">
                                        <button onClick={() => onRemove(triviaItem)} className="w-full h-full text-sm bg-red-400 hover:opacity-75 rounded">Remove</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

TriviaList.propTypes = {
    trivia: PropTypes.array.isRequired,
    userId: PropTypes.number,
    onRemove: PropTypes.func,
    canControl: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.tokens ? state.tokens.id : null
    };
};

export default connect(mapStateToProps)(TriviaList);

