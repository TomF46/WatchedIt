import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPersonById } from "../../api/peopleApi";


function Person() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        if (!person) {
            getPerson();
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

    return (
        <div className="person-page">
            {!person ? (
                <p>Loading...</p>
            ) : (
                 <p className="text-primary text-xl">{person.firstName} {person.lastName}</p>
            )}
        </div>
    );
  }
  
  export default Person;
  