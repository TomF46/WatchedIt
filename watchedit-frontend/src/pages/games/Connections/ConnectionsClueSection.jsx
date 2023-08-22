import PropTypes from "prop-types";
import FilmCreditPreview from "../../../components/Films/Credits/FIlmCreditPreview";
const ConnectionsClueSection = ({ clues }) => {
    return (
        <>
            <h3 className="text-4xl text-primary text-center mb-2">Clues</h3>
            <div className="grid grid-cols-12">
                {clues.map((credit) => {
                    return (
                        <div className="col-span-12 md:col-span-4 lg:col-span-2 my-2" key={credit.id}>
                            <FilmCreditPreview credit={credit} isLink={false} showFilmName={true} />
                        </div>
                    )
                })}
            </div>
        </>
    );
};

ConnectionsClueSection.propTypes = {
    clues: PropTypes.array.isRequired,
};

export default ConnectionsClueSection;
