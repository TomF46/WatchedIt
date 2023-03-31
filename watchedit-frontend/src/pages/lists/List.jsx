import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteFilmList, getFilmListById, removeFilmFromFilmList } from "../../api/filmListsApi";
import FilmGrid from "../../components/Films/FilmGrid";


function List() {
    const { id } = useParams();
    const navigate = useNavigate();
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
                toast.error(`Error getting list ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function confirmDelete(){
        if(!list.userCanEdit) return;
        confirmAlert({
            title : "Confirm deletion",
            message: `Are you sure you want to remove ${list.name}?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteList()
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteList(){
        deleteFilmList(list.id).then(res => {
            toast.success("Film removed");
            navigate("/lists");
        }).catch((err) => {
            toast.error(`Error removing list ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function handleRemove(film){
        confirmAlert({
            title : "Confirm removal",
            message: `Are you sure you want to remove ${film.name} from your list?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => removeFilm(film)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function removeFilm(film){
        removeFilmFromFilmList(list.id, film).then(() => {
            toast.success("Film removed from list");
            getList();
        }).catch((err) => {
            toast.error(`Error removing film from list ${err.data.Exception}`, {
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
                    {list.userCanEdit && (
                        <div className="owner-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">
                                    List owner controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/lists/${id}/add`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Add films
                                </Link>
                                <Link
                                    to={`/lists/${id}/edit`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block ml-2"
                                >
                                    Edit list
                                </Link>
                                <button onClick={() => {confirmDelete()}} className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <p className="text-primary text-xl">{list.name}</p>
                    <p className="text-primary text-xl">{list.description}</p>
                    <FilmGrid films={list.films} editable={list.userCanEdit} onRemove={handleRemove}/>
                </div>
            )}
        </div>
    );
  }
  
  export default List;
  