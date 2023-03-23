import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCreditsForPersonById } from "../../../api/creditsApi";
import { getPersonById } from "../../../api/peopleApi";
import PersonCreditsList from "../../../components/People/Credits/PersonCreditsList";


function PersonCredits() {
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
                toast.error(`Error getting person ${err.message}`, {
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
                toast.error(`Error getting persons credits ${err.message}`, {
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
                    {credits && (<PersonCreditsList credits={credits} />)}
                </>
            )}
        </div>
    );
  }
  
  export default PersonCredits;
  