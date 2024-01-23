import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { addCreditForFilm } from "../../../api/creditsApi";
import { getFilmById } from "../../../api/filmsApi";
import { searchPeoplePaginated } from "../../../api/peopleApi";
import PaginationControls from "../../../components/PaginationControls";
import SelectPersonWSearch from "../../../components/People/Credits/SelectPersonWSearch";
import AddCreditForm from "../../../components/Credits/AddCreditForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import PersonMiniDetail from "../../../components/People/PersonMiniDetail";

function AddCreditForFilm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [peoplePaginator, setPeoplePaginator] = useState(null);
  const [page, setPage] = useState(1);
  const peoplePerPage = 20;
  const [searchTerms, setSearchTerms] = useState({
    firstName: "",
    lastName: "",
    stageName: "",
  });
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [saving, setSaving] = useState(false);

  const search = useCallback(() => {
    searchPeoplePaginated(searchTerms, page, peoplePerPage)
      .then((res) => {
        setPeoplePaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting films ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, searchTerms, peoplePerPage]);

  useEffect(() => {
    getFilmById(id)
      .then((res) => {
        setFilm(res);
      })
      .catch((err) => {
        toast.error(`Error getting film ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [id]);

  useEffect(() => {
    let debounced = debounce(() => {
      search();
    }, 50);

    debounced();
  }, [page, searchTerms, search]);

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
    setSaving(true);

    let payload = {
      personId: selectedPerson.id,
      role: credit.role,
      type: credit.type,
    };

    addCreditForFilm(film.id, payload)
      .then(() => {
        navigate(`/films/${film.id}/credits`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error adding credit ${err.data.Exception}`, {
          autoClose: false,
        });
      });
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
