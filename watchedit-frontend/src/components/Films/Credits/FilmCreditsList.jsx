import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmCreditsList = ({ credits, canEdit, onRemove }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {credits.map((credit) => {
                return (
                    <div className="col-span-12" key={credit.id}>
                        <div className="grid grid-cols-12 my-2">
                            <div className={`${canEdit ? "col-span-10" : "col-span-12"}`}>
                                <div onClick={() => {navigate(`/people/${credit.person.id}`)}} className="p-4 mx-2 bg-backgroundOffset cursor-pointer">
                                    <p>{credit.person.fullName} {credit.role} {`(${credit.type})`}</p>
                                </div>
                            </div>
                            {canEdit && (
                                <>
                                    <div className="col-span-1 pr-1">
                                        <button onClick={() => navigate(`/credits/${credit.id}/edit`)} className="w-full h-full bg-primary hover:opacity-75">Edit</button>
                                    </div>
                                    <div className="col-span-1 pl-1">
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

FilmCreditsList.propTypes = {
    credits: PropTypes.array.isRequired,
    canEdit: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default FilmCreditsList;
