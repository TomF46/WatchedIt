import React from "react";
import PropTypes from "prop-types";
import TextInput from "../Inputs/TextInput";

const SelectFilmListWSearch = ({ currentFilms, films, searchTerm, onSearchTermChange , onFilmSelected }) => {
    function isAlreadyInList(film){
        return currentFilms.some(x => x.id == film.id);
    }

    return (
        <>
            <div className="search-box">
                <div className="mb-2">
                    <TextInput
                        name="searchTerm"
                        label="Search"
                        value={searchTerm}
                        onChange={onSearchTermChange}
                        required={false}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12">
                {films.map((film) => {
                    return (
                        <div key={film.id} className="col-span-12 my-2">
                            <div onClick={() => { if(!isAlreadyInList(film)) onFilmSelected(film)}} className={`p-4 mx-2 ${isAlreadyInList(film) ? "bg-green-400" : "bg-backgroundOffset cursor-pointer"}`}>
                                <p>{film.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

SelectFilmListWSearch.propTypes = {
    currentFilms: PropTypes.array.isRequired,
    films: PropTypes.array.isRequired,
    searchTerm: PropTypes.string,
    onSearchTermChange: PropTypes.func.isRequired,
    onFilmSelected: PropTypes.func.isRequired
};

export default SelectFilmListWSearch;
