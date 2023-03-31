import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCreditsForPersonById, removeCredit } from "../../../api/creditsApi";
import { getPersonById } from "../../../api/peopleApi";
import PersonCreditsList from "../../../components/People/Credits/PersonCreditsList";


function PersonCredits({isAdmin}) {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        if (!person) {
            getPerson();
            getCredits();
        }
    }, [id, person]);

    function getPerson() {
        getPersonById(id)
            .then((res) => {
                setPerson(res);
            })
            .catch((err) => {
                toast.error(`Error getting person ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function getCredits(){
        getCreditsForPersonById(id)
            .then((res) => {
                setCredits(res);
            })
            .catch((err) => {
                toast.error(`Error getting persons credits ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleRemoveCredit(credit){
        confirmAlert({
            title : "Confirm removal",
            message: `Are you sure you want to remove this credit?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteCredit(credit)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteCredit(credit){
        removeCredit(credit.id).then(() => {
            toast.success("Credit removed");
            getCredits();
        }).catch((err) => {
            toast.error(`Error removing persons credit ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="person-page">
            {!person ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/people/${person.id}/credits/add`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Add credit
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        <h1 className="text-primary text-center text-2xl mb-4">{person.firstName} {person.lastName} credits</h1>
                        {credits && (<PersonCreditsList credits={credits} canEdit={isAdmin} onRemove={handleRemoveCredit} />)}
                    </div>
                </>
            )}
        </div>
    );
  }
  
  PersonCredits.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(PersonCredits);

