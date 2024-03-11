import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getReviewsByFilmId } from "../../../api/filmReviewApi";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import StarIcon from "../../../components/Icons/StarIcon";

function Reviews() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const reviewsPerPage = 20;

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { data: reviewsPaginator } = useQuery({
    queryKey: ["film-reviews", id, page, reviewsPerPage],
    queryFn: () =>
      getReviewsByFilmId(Number(id), page, reviewsPerPage).catch((error) => {
        toast.error(`Error getting film reviews ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={"Error loading film."}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className="film-reviews-page">
      {!film ? (
        <LoadingMessage message={"Loading film"} />
      ) : (
        <>
          <h1 className="text-center text-primary text-4xl mt-4 mb-2 font-semibold">
            {film.name} reviews
          </h1>
          {film.averageRating && (
            <p className="text-center text-primary text-xl mb-4">
              Average rating: {film.averageRating}
            </p>
          )}
          <div className="review-controls bg-backgroundOffset mt-4 rounded-md">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-semibold text-lg px-2 py-1">
                Review controls
              </p>
            </div>
            <div className="px-2 py-2">
              <Link
                to={`/films/${film.id}/reviews/add`}
                className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
              >
                Add review
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <FilmMiniDetail film={film} />
            {reviewsPaginator ? (
              <>
                {reviewsPaginator.data.length > 0 ? (
                  <div className="mt-4">
                    <ReviewOverviewList
                      reviews={reviewsPaginator.data}
                      showFilm={false}
                    />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={reviewsPaginator.of}
                      from={reviewsPaginator.from}
                      to={reviewsPaginator.to}
                      lastPage={reviewsPaginator.lastPage}
                    />
                  </div>
                ) : (
                  <div className="my-16">
                    <div className="flex justify-center text-center">
                      <StarIcon
                        color="primary"
                        height={14}
                        width={14}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-center text-xl">
                      This film currently has no reviews.{" "}
                      <Link
                        to={`/films/${film.id}/reviews/add`}
                        className="text-primary hover:opacity-75"
                      >
                        Add one now.
                      </Link>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <LoadingMessage message={"Loading reviews"} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Reviews;
