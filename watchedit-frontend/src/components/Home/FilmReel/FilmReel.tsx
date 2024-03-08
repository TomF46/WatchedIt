import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { searchFilmsPaginated } from "../../../api/filmsApi";
import FilmPreview from "../../Films/FilmPreview";
import { useQuery } from "@tanstack/react-query";
import { FilmSearchParameters } from "../../../types/Films";
import FilmIcon from "../../Icons/FilmIcon";

type Props = {
  title: string;
  subtitle?: string;
  sort: string;
  onlyShowReleased: boolean;
};

function FilmReel({ title, subtitle, sort, onlyShowReleased }: Props) {
  const page = 1;
  const filmsPerPage = 8;
  const searchParams = {
    sort: sort,
  } as FilmSearchParameters;
  if (onlyShowReleased)
    searchParams.releasedBeforeDate = new Date().toISOString();

  const { isLoading, data, error } = useQuery({
    queryKey: ["films", sort, onlyShowReleased, filmsPerPage, page],
    queryFn: () =>
      searchFilmsPaginated(searchParams, page, filmsPerPage).then(
        (res) => res.data,
      ),
  });

  if (isLoading) return <LoadingMessage message={"Loading films."} />;

  if (error) {
    toast.error(`Error getting films ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (data)
    return (
      <div className="films-reel">
        <div className="mt-4">
          <Link
            to={"/films"}
            className="text-primary text-2xl hover:opacity-75 inline-flex items-center font-semibold"
          >
            {title}
          </Link>
          {subtitle && <p>{subtitle}</p>}
          {data.length > 0 ? (
            <div className="grid grid-cols-16">
              {data.map((film) => {
                return (
                  <FilmPreview key={film.id} film={film} editable={false} />
                );
              })}
            </div>
          ) : (
            <div className="my-16">
              <div className="flex justify-center text-center">
                <FilmIcon color="primary" height={14} width={14} />
              </div>
              <p className="text-center text-2xl">No films match your search</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default FilmReel;
