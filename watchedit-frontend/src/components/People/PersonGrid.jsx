import PropTypes from "prop-types";
import PersonPreview from "./PersonPreview";

const PersonGrid = ({ people }) => {
    return (
        <div className="grid grid-cols-16">
            {people.map((person) => {
                return (
                    <PersonPreview key={person.id} person={person} isLink={true} />
                )
            })}
        </div>
    );
};

PersonGrid.propTypes = {
    people: PropTypes.array.isRequired,
};

export default PersonGrid;
