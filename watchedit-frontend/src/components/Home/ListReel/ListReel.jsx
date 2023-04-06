import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ListReelItem from "./ListReelItem";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmListsPaginated } from "../../../api/filmListsApi";


function ListReel() {
    const [listsPaginator, setListsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const listsPerPage = 8;

    useEffect(() => {
        if (!listsPaginator) {
            getLists();
        }
    }, [listsPaginator]);

    function getLists() {
        getFilmListsPaginated(page, listsPerPage)
            .then((res) => {
                setListsPaginator(res);
            })
            .catch((err) => {
                toast.error(`Error getting lists ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="lists-reel">
            {!listsPaginator ? (
                <LoadingMessage message={"Loading lists."} />
            ) : (
                <div className="mt-4">
                    <Link to={"/lists"} className="text-primary text-2xl hover:opacity-75">Lists</Link>
                    {listsPaginator.data.length > 0 ? (
                        <div className="grid grid-cols-12">
                            {listsPaginator.data.map((list) => {
                                return (
                                    <ListReelItem list={list} />
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-primary text-2xl">No lists match your search</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ListReel;
