import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";

const SelectFilmCreditListWSearch = ({ films, searchTerm, onSearchTermChange , onFilmSelected }) => {
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
                            <div onClick={() => {onFilmSelected(film)}} className={`p-4 mx-2 bg-backgroundOffset cursor-pointer`}>
                                <p>{film.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

SelectFilmCreditListWSearch.propTypes = {
    films: PropTypes.array.isRequired,
    searchTerm: PropTypes.string,
    onSearchTermChange: PropTypes.func.isRequired,
    onFilmSelected: PropTypes.func.isRequired
};

export default SelectFilmCreditListWSearch;
