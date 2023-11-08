import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmListsPaginated } from "../../../api/filmListsApi";
import ListPreview from "./ListPreview";

function ListReel() {
  const [listsPaginator, setListsPaginator] = useState(null);
  const page = 1;
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
          <Link
            to={"/lists"}
            className="text-primary text-2xl hover:opacity-75"
          >
            Lists
          </Link>
          {listsPaginator.data.length > 0 ? (
            <div className="grid grid-cols-12">
              {listsPaginator.data.map((list) => {
                return <ListPreview key={list.id} list={list} />;
              })}
            </div>
          ) : (
            <p className="text-center text-primary text-2xl">
              No lists match your search
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ListReel;
