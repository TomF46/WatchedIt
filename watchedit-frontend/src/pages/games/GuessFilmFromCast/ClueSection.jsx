import PropTypes from "prop-types";
import PersonClue from "../PersonClue";

const ClueSection = ({ game }) => {
    return (
        <div>
            <h3 className="text-4xl text-primary text-center mb-2">Clues</h3>
            <div className="grid grid-cols-12">
                {game.clues.map((person) => {
                    return (
                        <div className="col-span-12 md:col-span-4 lg:col-span-2 my-2" key={person.id}>
                            <PersonClue person={person} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

ClueSection.propTypes = {
    game: PropTypes.object.isRequired,
};

export default ClueSection;
