import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import PaginationControls from "../../../components/PaginationControls";
import { addFilmToFilmList, getFilmListById } from "../../../api/filmListsApi";
import SelectFilmListWSearch from "../../../components/Films/SelectFilmListWSearch";
import { searchFilmsPaginated } from "../../../api/filmsApi";


function AddFilmToList() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [films, setFilms] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 20;
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        if (!list) {
            getList();
        }
    }, [id, list]);

    useEffect(() => {
        if (!films) {
          search();
        }
    }, [films]);
    
    useEffect(() => {
        if(lastPageLoaded != null) search();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerm])

    function getList() {
        getFilmListById(id)
            .then((res) => {
                if(!res.userCanEdit) navigate(`/lists/${res.id}`);
                setList(res);
            })
            .catch((err) => {
                toast.error(`Error getting list ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function search(){
        searchFilmsPaginated(searchTerm, page, filmsPerPage).then(res => {
          setFilms(res);
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
    
    function handleFilmSelected(film){
        addFilmToFilmList(list.id, film).then(res => {
            navigate(`/lists/${list.id}`);
        }).catch(err => {
          console.log(err);
          toast.error(`Error adding film to list ${err.data.Exception}`, {
              autoClose: false,
          });
        })
    }

    return (
        <div className="add-film-to-list-page">
            {!list ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p className="text-primary text-xl">Add films to {list.name}</p>
                    {!films ? (
                        <p>Loading films....</p>
                        ) : (
                            <div className="mt-4">
                                <SelectFilmListWSearch films={films} currentFilms={list.films} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} onFilmSelected={handleFilmSelected}/>
                                <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
  }
  
  export default AddFilmToList;
  