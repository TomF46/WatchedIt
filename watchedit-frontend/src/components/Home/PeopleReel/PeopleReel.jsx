import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getPeoplePaginated } from "../../../api/peopleApi";
import PeopleReelItem from "./PeopleReelItem";


function PeopleReel() {
    const [peoplePaginator, setPeoplePaginator] = useState(null);
    const [page, setPage] = useState(1);
    const peoplePerPage = 6;

    useEffect(() => {
        if (!peoplePaginator) {
            getPeople();
        }
    }, [peoplePaginator]);

    function getPeople() {
        getPeoplePaginated(page, peoplePerPage)
            .then((res) => {
                setPeoplePaginator(res);
            })
            .catch((err) => {
                toast.error(`Error getting people ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="people-reel">
            {!peoplePaginator ? (
                <LoadingMessage message={"Loading people."} />
            ) : (
                <div className="mt-4">
                    <Link to={"/people"} className="text-primary text-2xl hover:opacity-75">People</Link>
                    {peoplePaginator.data.length > 0 ? (
                        <div className="grid grid-cols-12">
                            {peoplePaginator.data.map((person) => {
                                return (
                                    <PeopleReelItem key={person.id} person={person} />
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-primary text-2xl">No people match your search</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PeopleReel;
