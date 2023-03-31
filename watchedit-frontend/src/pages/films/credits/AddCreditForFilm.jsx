import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import { addCreditForFilm } from "../../../api/creditsApi";
import { getFilmById } from "../../../api/filmsApi";
import { searchPeoplePaginated } from "../../../api/peopleApi";
import PaginationControls from "../../../components/PaginationControls";
import SelectPersonCreditListWSearch from "../../../components/People/Credits/SelectPersonCreditListWSearch";
import AddCreditForm from "../../../components/Credits/AddCreditForm";

function AddCreditForFilm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [people, setPeople] = useState(null);
    const [page, setPage] = useState(1);
    const [filmsPerPage, setFilmsPerPage] = useState(10);
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!film) {
            getFilm();
        }
    }, [id, film]);

    function getFilm() {
        getFilmById(id)
            .then((res) => {
                console.log(res);
                setFilm(res);
            })
            .catch((err) => {
                toast.error(`Error getting film ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    useEffect(() => {
        if (!people) {
          search();
        }
    }, [people]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerm])

    function search(){
        searchPeoplePaginated(searchTerm, page, filmsPerPage).then(res => {
            setPeople(res);
            let lastPage = res.length != filmsPerPage;
            setIsLastPage(lastPage);
            setLastPageLoaded(page);
          }).catch(err => {
            console.log(err);
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

    function handlePersonSelected(person){
        setSelectedPerson(person);
    }

    function handleSave(credit){
        setSaving(true);

        let payload = {
            personId: selectedPerson.id,
            role: credit.role,
            type: credit.type
        };

        addCreditForFilm(film.id, payload).then(res => {
            navigate(`/films/${film.id}/credits`);
        }).catch(err => {
            console.log(err);
            setSaving(false);
            toast.error(`Error adding credit ${err.data.Exception}`, {
                autoClose: false,
            });
          })
    }

    return (
        <div className="add-film-credit-page">
            {! film ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p className="text-primary text-xl">Add Credit for {film.name}</p>
                    {!people ? (
                        <p>Loading people...</p>
                    ) : (
                        <div className="mt-4">
                            {!selectedPerson ? (
                                <>
                                    <SelectPersonCreditListWSearch people={people} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} onPersonSelected={handlePersonSelected} />
                                    <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />  
                                </>  
                            ) : (
                                <div>
                                    <div className="mb-2">
                                        <p>Person: {selectedPerson.firstName} {selectedPerson.lastName}  <span className="cursor-pointer" onClick={() => {handlePersonSelected(null)}}>(Change)</span></p>
                                    </div>
                                    <AddCreditForm  onSave={handleSave} saving={saving} />
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
