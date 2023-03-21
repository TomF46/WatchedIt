import { React, useState, useEffect } from "react";
import { getFilmsPaginated } from "../../api/filmsApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";

function Films() {
  const [films, setFilms] = useState(null);
  const [page, setPage] = useState(1);
  const [filmsPerPage, setFilmsPerPage] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!films) {
      getFilms();
    }
  }, [films]);

  function getFilms(){
    getFilmsPaginated(page, filmsPerPage).then(res => {
      setFilms(res);
      let lastPage = res.length != filmsPerPage;
      setIsLastPage(lastPage);
    }).catch(err => {
      console.log(err);
    })
  }

  function handleNextPage(){
    var newPage = page + 1;
    setPage(newPage);
    getFilms();
  }

  function handlePreviousPage(){
    var newPage = page - 1;
    setPage(newPage);
    getFilms();
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
