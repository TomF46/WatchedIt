import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getWatchedListByUserId } from "../../api/usersApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";

function WatchedList({id}) {
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
    getWatchedListByUserId(id ,page, filmsPerPage).then(res => {
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
    <div className="watched-films-page">
      {!films ? (
        <p>Loading watched films....</p>
      ) : (
        <div className="mt-4">
          <FilmGrid films={films} editable={false} />
          <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
        </div>
      )}
    </div>
  )
}

WatchedList.propTypes = {
    id: PropTypes.any.isRequired
};

const mapStateToProps = (state) => {
    const { id } = useParams();
    return {
        id:  id ? id : state.tokens.id,
    };
};

export default connect(mapStateToProps)(WatchedList);

