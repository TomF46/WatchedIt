import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { forefeitGuessFilmFromCastGameById } from "../../api/gamesApi";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const GameInfoSection = ({ game }) => {
    const navigate = useNavigate();

    function confirmForefeit(){
        confirmAlert({
            title : "Confirm forefeit",
            message: `Are you sure you want to forefeit this game?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => forefeit()
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function forefeit()
    {
        forefeitGuessFilmFromCastGameById(game.id).then(() => {
            navigate(`/games/filmFromCast`);
        }).catch((err) => {
            toast.error(`Error forefeiting game ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="grid grid-cols-12 bg-backgroundOffset p-4 shadow rounded text-center">
            <div className="col-span-12">
                <p className="text-lg">Guesses:</p>
                <p className="text-lg text-primary">{game.clues.length}</p>
            </div>
            <div className="col-span-12 mt-4">
                <p className="text-lg">Started:</p>
                <p className="text-lg text-primary">{format(parseISO(game.createdDate), "dd/MM/yyyy HH:mm")}</p>
            </div>
            <div className="col-span-12 mt-4">
                <p className="text-lg">Status</p>
                <p className="text-lg text-primary">{game.statusText}</p>
            </div>
            <div className="col-span-12 mt-4">
                <Link
                    to={`/games/filmFromCast`}
                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                >
                    Start another
                </Link>
            </div>
            {game.status == 1 && (
                <div className="col-span-12">
                    <button onClick={confirmForefeit} className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center">
                        Forefeit
                    </button>
                </div>
            )}
        </div>
    );
}

GameInfoSection.propTypes = {
    game: PropTypes.object.isRequired,
};

export default GameInfoSection;
