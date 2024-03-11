import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getCreditsForFilmById, removeCredit } from "../../../api/creditsApi";
import FilmCreditsList from "../../../components/Films/Credits/FilmCreditsList";
import { confirmAlert } from "react-confirm-alert";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import { useAppSelector } from "../../../redux/store";
import { Credit } from "../../../types/Credits";
import CameraIcon from "../../../components/Icons/CameraIcon";

function FilmCredits() {
  const { id } = useParams();
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { data: credits, refetch } = useQuery({
    queryKey: ["film-credits", id],
    queryFn: () =>
      getCreditsForFilmById(Number(id)).catch((error) => {
        toast.error(`Error getting film credits ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  const deleteCredit = useMutation({
    mutationFn: (creditToRemove: Credit) => removeCredit(creditToRemove),
    onSuccess: () => {
      toast.success("Credit removed");
      refetch();
    },
    onError: (err) => {
      toast.error(`Error removing film credit ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleRemoveCredit(credit: Credit): void {
    confirmAlert({
      title: "Confirm removal",
      message: `Are you sure you want to remove this credit?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCredit.mutate(credit),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={"Error loading film."}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className="film-credits-page">
      {!film ? (
        <LoadingMessage message={"Loading film credits"} />
      ) : (
        <>
          <h1 className="text-primary text-center text-4xl my-4 font-semibold">
            {film.name} credits
          </h1>
          {isAdmin && (
            <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-semibold text-lg px-2 py-1">
                  Admin controls
                </p>
              </div>
              <div className="px-2 py-2">
                <Link
                  to={`/films/${film.id}/credits/add`}
                  className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  Add credit
                </Link>
              </div>
            </div>
          )}
          <div className="mt-4">
            <FilmMiniDetail film={film} />
            {credits && (
              <>
                {credits.cast.length + credits.crew.length == 0 && (
                  <div className="my-16">
                    <div className="flex justify-center text-center">
                      <CameraIcon color="primary" height={14} width={14} />
                    </div>
                    <p className="text-center text-xl">
                      This film does not have any credits.
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    {credits.cast.length > 0 && (
                      <>
                        <h2 className="mt-4 text-primary text-xl ">Cast</h2>
                        <FilmCreditsList
                          credits={credits.cast}
                          canEdit={isAdmin}
                          onRemove={handleRemoveCredit}
                        />
                      </>
                    )}
                  </div>
                  <div className="col-span-12 mt-4">
                    {credits.crew.length > 0 && (
                      <>
                        <h2 className="mt-4 text-primary text-xl ">Crew</h2>
                        <FilmCreditsList
                          credits={credits.crew}
                          canEdit={isAdmin}
                          onRemove={handleRemoveCredit}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default FilmCredits;
