import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { addCreditForPerson } from "../../../api/creditsApi";
import { searchFilmsPaginated } from "../../../api/filmsApi";
import { getPersonById } from "../../../api/peopleApi";
import SelectFilmWSearch from "../../../components/Films/Credits/SelectFilmWSearch";
import PaginationControls from "../../../components/PaginationControls";
import AddCreditForm from "../../../components/Credits/AddCreditForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PersonMiniDetail from "../../../components/People/PersonMiniDetail";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function AddCreditForPerson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const filmsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [saving, setSaving] = useState(false);

  const { data: person, error: personLoadError } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPersonById(id),
  });

  const { data: filmsPaginator, refetch } = useQuery({
    queryKey: ["films", searchTerm, page, filmsPerPage],
    queryFn: () =>
      searchFilmsPaginated(
        { searchTerm: searchTerm },
        page,
        filmsPerPage,
      ).catch((error) => {
        toast.error(`Error getting people ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    let debounced = debounce(() => {
      refetch();
    }, 50);

    debounced();
  }, [page, searchTerm, refetch]);

  function handleSearchTermChange(event) {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) setPage(1);
  }

  function handleFilmSelected(film) {
    setSelectedFilm(film);
  }

  function handleSave(credit) {
    setSaving(true);

    let payload = {
      filmId: selectedFilm.id,
      role: credit.role,
      type: credit.type,
    };

    addCreditForPerson(person.id, payload)
      .then(() => {
        navigate(`/people/${person.id}/credits`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error adding film credit ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (personLoadError) {
    toast.error(`Error getting film ${personLoadError.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="add-person-credit-page">
      {!person ? (
        <LoadingMessage message={"Loading person"} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-semibold">
            Add Credit for {person.fullName}
          </h1>
          <PersonMiniDetail person={person} />
          {!filmsPaginator ? (
            <LoadingMessage message={"Loading films."} />
          ) : (
            <div className="mt-4">
              {!selectedFilm ? (
                <>
                  <SelectFilmWSearch
                    films={filmsPaginator.data}
                    searchTerm={searchTerm}
                    onSearchTermChange={handleSearchTermChange}
                    onFilmSelected={handleFilmSelected}
                    cardMode={false}
                  />
                  <PaginationControls
                    currentPage={page}
                    onPageChange={setPage}
                    of={filmsPaginator.of}
                    from={filmsPaginator.from}
                    to={filmsPaginator.to}
                    lastPage={filmsPaginator.lastPage}
                  />
                </>
              ) : (
                <div>
                  <div className="mb-2">
                    <FilmMiniDetail film={selectedFilm} />
                    <p>
                      Film: {selectedFilm.name}{" "}
                      <span
                        className="cursor-pointer text-primary"
                        onClick={() => {
                          handleFilmSelected(null);
                        }}
                      >
                        (Change)
                      </span>
                    </p>
                    <AddCreditForm onSave={handleSave} saving={saving} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddCreditForPerson;
