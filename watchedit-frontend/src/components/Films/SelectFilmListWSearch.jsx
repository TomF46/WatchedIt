import React from "react";
import PropTypes from "prop-types";
import TextInput from "../Inputs/TextInput";

const SelectFilmListWSearch = ({ currentFilms, films, searchTerm, onSearchTermChange , onFilmSelected }) => {
    function isAlreadyInList(film){
        return currentFilms.some(x => x.id == film.id);
    }

    return (
        <>
            <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4 shadow">
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
                        <div key={film.id} onClick={() => { if(!isAlreadyInList(film)) onFilmSelected(film)}} className={`col-span-12 my-2 shadow rounded ${isAlreadyInList(film) ? "bg-green-400" : "bg-backgroundOffset cursor-pointer hover:opacity-75"}`}>
                            <div className="grid grid-cols-24">
                                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                                    <img src={film.posterUrl} className="h-full poster rounded-l" alt={`${film.name} poster.`} />
                                </div>
                                <div className="col-span-21 md:col-span-22 lg:col-span-23 inline-flex items-center">
                                    <p className="p-4">{film.name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            ) : (
                <div className="my-16">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-primary mx-auto text-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                    </svg>
                    <p className="text-center text-2xl">No film match your search</p>
                </div>
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
