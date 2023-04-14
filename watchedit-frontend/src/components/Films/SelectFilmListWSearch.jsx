import React from "react";
import PropTypes from "prop-types";
import TextInput from "../Inputs/TextInput";

const SelectFilmListWSearch = ({ currentFilms, films, searchTerm, onSearchTermChange , onFilmSelected }) => {
    function isAlreadyInList(film){
        return currentFilms.some(x => x.id == film.id);
    }

    return (
        <>
            <div className="search-controls bg-backgroundOffset mt-4 rounded-md mb-4">
                <div className="bg-backgroundOffset2 rounded-t-md">
                    <p className="text-primary font-bold text-lg px-2 py-1">
                        Search
                    </p>
                </div>
                <div className="px-2 py-2">
                    <div className="search-box">
                        <TextInput
                            name="searchTerm"
                            label="Search"
                            value={searchTerm}
                            onChange={onSearchTermChange}
                            required={false}
                        />
                    </div>
                </div>
            </div>
            {films.length > 0 ? (
                <div className="grid grid-cols-12">
                {films.map((film) => {
                    return (
                        <div key={film.id} className="col-span-12 my-2">
                            <div onClick={() => { if(!isAlreadyInList(film)) onFilmSelected(film)}} className={`p-4 mx-2 ${isAlreadyInList(film) ? "bg-green-400" : "bg-backgroundOffset cursor-pointer hover:opacity-75"}`}>
                                <p>{film.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            ) : (
                <p className="text-center text-primary text-2xl">No films match your search</p>
            )}
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
