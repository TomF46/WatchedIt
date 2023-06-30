import PropTypes from "prop-types";
import FilmCreditPreview from "./FIlmCreditPreview";

const FilmCreditsOverviewList = ({ credits }) => {
    return (
        <div className="grid grid-cols-12">
            {credits.map((credit) => {
                return (
                    <div className="col-span-8 md:col-span-4 lg:col-span-2 my-2" key={credit.id}>
                        <FilmCreditPreview credit={credit} />
                    </div>
                )
            })}
        </div>
    );
};

FilmCreditsOverviewList.propTypes = {
    credits: PropTypes.array.isRequired,
};

export default FilmCreditsOverviewList;
