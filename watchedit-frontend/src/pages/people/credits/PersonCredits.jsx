import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { useParams } from "react-router-dom";
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
                    <p className="text-primary text-xl">{person.firstName} {person.lastName} credits</p>
                    {credits && (<PersonCreditsList credits={credits} canEdit={isAdmin} onRemove={handleRemoveCredit} />)}
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

