import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addCreditForFilm } from "../../../api/creditsApi";
import { getFilmById } from "../../../api/filmsApi";
import { searchPeoplePaginated } from "../../../api/peopleApi";
import PaginationControls from "../../../components/PaginationControls";
import SelectPersonWSearch from "../../../components/People/Credits/SelectPersonWSearch";
import AddCreditForm from "../../../components/Credits/AddCreditForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import PersonMiniDetail from "../../../components/People/PersonMiniDetail";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import ErrorMessage from "../../../components/Error/ErrorMessage";

function AddCreditForFilm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const peoplePerPage = 20;
  const [searchTerms, setSearchTerms] = useState({
    firstName: "",
    lastName: "",
    stageName: "",
  });
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [saving, setSaving] = useState(false);
  const queryKeyParams = useDebounce([searchTerms, page, peoplePerPage], 100);

  const { data: peoplePaginator } = useQuery({
    queryKey: ["people", ...queryKeyParams],
    queryFn: () =>
      searchPeoplePaginated(searchTerms, page, peoplePerPage).catch((error) => {
        toast.error(`Error getting people ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(id),
  });

  const addFilmCredit = useMutation({
    mutationFn: (credit) => {
      setSaving(true);
      return addCreditForFilm(film.id, credit);
    },
    onSuccess: () => {
      navigate(`/films/${film.id}/credits`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error adding credit ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleSearchTermChange(event) {
    const { name, value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: value,
    }));
    if (page != 1) setPage(1);
  }

  function handlePersonSelected(person) {
    setSelectedPerson(person);
  }

  function handleSave(credit) {
    let payload = {
      personId: selectedPerson.id,
      role: credit.role,
      type: credit.type,
    };
    addFilmCredit.mutate(payload);
  }

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={"Error loading film to add credit to."}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className="add-film-credit-page">
      {!film ? (
        <LoadingMessage message={"Loading film."} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-semibold">
            Add Credit for {film.name}
          </h1>
          <FilmMiniDetail film={film} />
          {!peoplePaginator ? (
            <LoadingMessage message={"Loading people."} />
          ) : (
            <div className="mt-4">
              {!selectedPerson ? (
                <>
                  <SelectPersonWSearch
                    people={peoplePaginator.data}
                    searchTerms={searchTerms}
                    onSearchTermChange={handleSearchTermChange}
                    onPersonSelected={handlePersonSelected}
                    cardMode={false}
                  />
                  <PaginationControls
                    currentPage={page}
                    onPageChange={setPage}
                    of={peoplePaginator.of}
                    from={peoplePaginator.from}
                    to={peoplePaginator.to}
                    lastPage={peoplePaginator.lastPage}
                  />
                </>
              ) : (
                <div>
                  <div className="mb-2">
                    <PersonMiniDetail person={selectedPerson} />
                    <p>
                      Person: {selectedPerson.fullName}{" "}
                      <span
                        className="cursor-pointer text-primary"
                        onClick={() => {
                          handlePersonSelected(null);
                        }}
                      >
                        (Change)
                      </span>
                    </p>
                  </div>
                  <AddCreditForm onSave={handleSave} saving={saving} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddCreditForFilm;
