import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonCreditsList = ({ credits, canEdit, onRemove }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {credits.map((credit) => {
                return (
                    <div className="col-span-12" key={credit.id}>
                        <div className="grid grid-cols-24 my-1">
                            <div className="col-span-1">
                                <img src={credit.film.posterUrl} className="h-full poster" />
                            </div>
                            <div className={`${canEdit ? "col-span-19" : "col-span-23"}`}>
                                <div onClick={() => {navigate(`/films/${credit.film.id}`)}} className="p-4 inline-flex items-center w-full h-full bg-backgroundOffset cursor-pointer hover:opacity-75">
                                    <p>{credit.film.name} - {credit.role} {`(${credit.type})`}</p>
                                </div>
                            </div>
                            {canEdit && (
                                <>
                                <div className="col-span-2 pr-1">
                                    <button onClick={() => navigate(`/credits/${credit.id}/edit`)} className="w-full h-full bg-primary hover:opacity-75">Edit</button>
                                </div>
                                <div className="col-span-2 pl-1">
                                    <button onClick={() => onRemove(credit)} className="w-full h-full bg-red-400 hover:opacity-75">Remove</button>
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

PersonCreditsList.propTypes = {
    credits: PropTypes.array.isRequired,
    canEdit: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default PersonCreditsList;

