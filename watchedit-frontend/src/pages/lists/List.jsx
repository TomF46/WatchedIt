import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteFilmList,
  getFilmListById,
  removeFilmFromFilmList,
} from "../../api/filmListsApi";
import FilmGrid from "../../components/Films/FilmGrid";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import UserMiniDetail from "../../components/User/UserMiniDetail";

function List() {
  const { id } = useParams();
  const userId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );

  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [userCanEdit, setUserCanEdit] = useState(false);

  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [id, list]);

  function getList() {
    getFilmListById(id)
      .then((res) => {
        setList(res);
        setUserCanEdit(res.createdBy.id == userId);
      })
      .catch((err) => {
        toast.error(`Error getting list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  function confirmDelete() {
    if (!userCanEdit) return;
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to remove ${list.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteList(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function deleteList() {
    deleteFilmList(list.id)
      .then(() => {
        toast.success("List removed");
        navigate("/lists");
      })
      .catch((err) => {
        toast.error(`Error removing list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  function handleRemove(film) {
    confirmAlert({
      title: "Confirm removal",
      message: `Are you sure you want to remove ${film.name} from your list?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => removeFilm(film),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function removeFilm(film) {
    removeFilmFromFilmList(list.id, film)
      .then(() => {
        toast.success("Film removed from list");
        getList();
      })
      .catch((err) => {
        toast.error(`Error removing film from list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="list-page">
      {!list ? (
        <LoadingMessage message={"Loading list"} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-bold">
            {list.name}
          </h1>
          {userCanEdit && (
            <div className="owner-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-bold text-lg px-2 py-1">
                  List owner controls
                </p>
              </div>
              <div className="px-2 py-2">
                <Link
                  to={`/lists/${id}/add`}
                  className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  Add films
                </Link>
                <Link
                  to={`/lists/${id}/edit`}
                  className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block ml-2"
                >
                  Edit list
                </Link>
                <button
                  onClick={() => {
                    confirmDelete();
                  }}
                  className="bg-backgroundOffset2 text-red-400 font-bold rounded py-2 px-4 hover:opacity-75 inline-block ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
          <div className="mt-4">
            <div className="grid grid-cols-12 my-4">
              <div className="col-span-8">
                <div className="bg-backgroundOffset p-4 shadow rounded h-full">
                  <h2 className="text-lg text-primary">Description:</h2>
                  <p>{list.description}</p>
                </div>
              </div>
              <div className="col-span-4 ml-2">
                <UserMiniDetail user={list.createdBy} />
              </div>
            </div>
            {list.films.length > 0 ? (
              <FilmGrid
                films={list.films}
                editable={userCanEdit}
                onRemove={handleRemove}
              />
            ) : (
              <div className="my-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-14 h-14 text-primary mx-auto text-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                  />
                </svg>
                <p className="text-center text-2xl">
                  {userCanEdit
                    ? "You have not yet added a film to this list."
                    : "The list owner has not added a film to this list."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
