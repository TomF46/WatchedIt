import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmListById } from "../../api/filmListsApi";
import FilmGrid from "../../components/Films/FilmGrid";


function List() {
    const { id } = useParams();
    const [list, setList] = useState(null);

    useEffect(() => {
        if (!list) {
            getList();
        }
    }, [id, list]);

    function getList() {
        getFilmListById(id)
            .then((res) => {
                setList(res);
            })
            .catch((err) => {
                toast.error(`Error getting list ${err.message}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="list-page">
            {!list ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p className="text-primary text-xl">{list.name}</p>
                    <p className="text-primary text-xl">{list.description}</p>
                    <FilmGrid films={list.films} />
                </div>
            )}
        </div>
    );
  }
  
  export default List;
  