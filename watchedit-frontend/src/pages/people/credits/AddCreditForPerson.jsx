import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import { addCreditForPerson, getCreditsForPersonById } from "../../../api/creditsApi";
import { searchFilmsPaginated } from "../../../api/filmsApi";
import { getPersonById } from "../../../api/peopleApi";
import SelectFilmCreditListWSearch from "../../../components/Films/Credits/SelectFilmCreditListWSearch";
import PaginationControls from "../../../components/PaginationControls";
import AddCreditForm from "../../../components/Credits/AddCreditForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PersonMiniDetail from "../../../components/People/PersonMiniDetail";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";

function AddCreditForPerson() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [saving, setSaving] = useState(false);
    
    useEffect(() => {
        if (!person) {
            getPerson();
        }
    }, [id, person]);

    function getPerson() {
        getPersonById(id)
            .then((res) => {
                setPerson(res);
            })
            .catch((err) => {
                toast.error(`Error getting person ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    useEffect(() => {
        if (!filmsPaginator) {
          search();
        }
    }, [filmsPaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) search();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerm])


    function search(){
        searchFilmsPaginated(searchTerm, page, filmsPerPage).then(res => {
          setFilmsPaginator(res);
          setLastPageLoaded(page);
        }).catch(err => {
          toast.error(`Error getting films ${err.data.Exception}`, {
              autoClose: false,
          });
        })
    }

    function handleNextPage(){
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage(){
        var newPage = page - 1;
        setPage(newPage);
    }

    function handleSearchTermChange(event){
        const { value } = event.target;
        setSearchTerm(value);
    }

    function handleFilmSelected(film){
        setSelectedFilm(film);
    }

    function handleSave(credit){
        setSaving(true);

        let payload = {
            filmId: selectedFilm.id,
            role: credit.role,
            type: credit.type
        };

        addCreditForPerson(person.id, payload).then(res => {
            navigate(`/people/${person.id}/credits`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error adding film credit ${err.data.Exception}`, {
                autoClose: false,
            });
          })
    }

    return (
        <div className="add-person-credit-page">
            {!person ? (
                <LoadingMessage message={"Loading person"} />
            ) : (
                <div>
                    <h1 className="text-center text-primary text-4xl my-4 font-bold">Add Credit for {person.fullName}</h1>
                    <PersonMiniDetail person={person} />
                    {!filmsPaginator ? (
                        <LoadingMessage message={"Loading films."} />
                        ) : (
                            <div className="mt-4">
                                {!selectedFilm ? (
                                    <>
                                        <SelectFilmCreditListWSearch films={filmsPaginator.data} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} onFilmSelected={handleFilmSelected}/>
                                        <PaginationControls
                                            currentPage={page}
                                            onNext={handleNextPage}
                                            onPrevious={handlePreviousPage}
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
                                            <p>Film: {selectedFilm.name}  <span className="cursor-pointer text-primary" onClick={() => {handleFilmSelected(null)}}>(Change)</span></p>
                                            <AddCreditForm onSave={handleSave} saving={saving} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default AddCreditForPerson;
