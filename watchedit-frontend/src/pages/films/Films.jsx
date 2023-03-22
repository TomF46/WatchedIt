import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getFilmsPaginated } from "../../api/filmsApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";

function Films() {
  const [films, setFilms] = useState(null);
  const [page, setPage] = useState(1);
  const [filmsPerPage, setFilmsPerPage] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastPageLoaded, setLastPageLoaded] = useState(null);

  useEffect(() => {
    if (!films) {
      getFilms();
    }
  }, [films]);

  useEffect(() => {
    if(lastPageLoaded != null) getFilms();
  }, [page]);

  function getFilms(){
    getFilmsPaginated(page, filmsPerPage).then(res => {
      setFilms(res);
      let lastPage = res.length != filmsPerPage;
      setIsLastPage(lastPage);
      setLastPageLoaded(page);
    }).catch(err => {
      console.log(err);
      toast.error(`Error getting films ${err.message}`, {
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

  return (
    <div className="films-page">
      {!films ? (
        <p>Loading films....</p>
      ) : (
        <div className="mt-4">
          <FilmGrid films={films} />
          <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
        </div>
      )}
    </div>
  )
}

export default Films;
