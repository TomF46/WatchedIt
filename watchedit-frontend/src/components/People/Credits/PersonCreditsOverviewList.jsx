import React from "react";
import PropTypes from "prop-types";
import PersonCreditPreview from "./PersonCreditPreview";

const PersonCreditsOverviewList = ({ credits }) => {
    return (
        <div className="grid grid-cols-16">
            {credits.map((credit) => {
                return (
                    <div className="col-span-8 md:col-span-4 lg:col-span-2 my-2" key={credit.id}>
                        <PersonCreditPreview credit={credit} />
                    </div>
                )
            })}
        </div>
    );
};

PersonCreditsOverviewList.propTypes = {
    credits: PropTypes.array.isRequired,
};

export default PersonCreditsOverviewList;

