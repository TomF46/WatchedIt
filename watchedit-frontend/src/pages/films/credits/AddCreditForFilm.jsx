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
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function AddCreditForFilm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [people, setPeople] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 20;
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [searchTerms, setSearchTerms] = useState({firstName: "", lastName: "", stageName: ""});
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
    }, [searchTerms])

    function search(){
        searchPeoplePaginated(searchTerms, page, filmsPerPage).then(res => {
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
        const { name, value } = event.target;
        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [name]: value
        }));
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
                <LoadingMessage message={"Loading film."} />
            ) : (
                <div>
                    <p className="text-primary text-xl">Add Credit for {film.name}</p>
                    {!people ? (
                        <LoadingMessage message={"Loading people."} />
                    ) : (
                        <div className="mt-4">
                            {!selectedPerson ? (
                                <>
                                    <SelectPersonCreditListWSearch people={people} searchTerms={searchTerms} onSearchTermChange={handleSearchTermChange} onPersonSelected={handlePersonSelected} />
                                    <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />  
                                </>  
                            ) : (
                                <div>
                                    <div className="mb-2">
                                        <p>Person: {selectedPerson.fullName} <span className="cursor-pointer" onClick={() => {handlePersonSelected(null)}}>(Change)</span></p>
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
