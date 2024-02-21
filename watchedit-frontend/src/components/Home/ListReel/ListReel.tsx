import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmListsPaginated } from "../../../api/filmListsApi";
import ListPreview from "./ListPreview";
import { useQuery } from "@tanstack/react-query";
import { List } from "../../../types/Lists";

function ListReel() {
  const page = 1;
  const listsPerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey: ["lists", listsPerPage, page],
    queryFn: () =>
      getFilmListsPaginated(page, listsPerPage).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={"Loading lists."} />;

  if (error) {
    toast.error(`Error getting lists ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="lists-reel">
      <div className="mt-4">
        <Link
          to={"/lists"}
          className="text-primary text-2xl hover:opacity-75 font-semibold"
        >
          Lists
        </Link>
        {data.length > 0 ? (
          <div className="grid grid-cols-12">
            {data.map((list: List) => {
              return <ListPreview key={list.id} list={list} />;
            })}
          </div>
        ) : (
          <p className="text-center text-primary text-2xl">
            No lists match your search
          </p>
        )}
      </div>
    </div>
  );
}

export default ListReel;
