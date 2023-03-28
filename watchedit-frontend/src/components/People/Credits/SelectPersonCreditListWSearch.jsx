import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";

const SelectPersonCreditListWSearch = ({ people, searchTerm, onSearchTermChange , onPersonSelected }) => {
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
                {people.map((person) => {
                    return (
                        <div key={person.id} className="col-span-12 my-2">
                            <div onClick={() => {onPersonSelected(person)}} className={`p-4 mx-2 bg-backgroundOffset cursor-pointer`}>
                                <p>{person.firstName} {person.lastName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

SelectPersonCreditListWSearch.propTypes = {
    people: PropTypes.array.isRequired,
    searchTerm: PropTypes.string,
    onSearchTermChange: PropTypes.func.isRequired,
    onPersonSelected: PropTypes.func.isRequired
};

export default SelectPersonCreditListWSearch;
