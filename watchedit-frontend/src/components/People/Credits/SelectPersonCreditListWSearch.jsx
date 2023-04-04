import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";

const SelectPersonCreditListWSearch = ({ people, searchTerms, onSearchTermChange , onPersonSelected }) => {
    return (
        <>
            <div className="search-controls bg-backgroundOffset mt-4 rounded-md mb-4">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">
                        Search
                    </p>
                </div>
                <div className="px-2 py-2">
                    <div className="search-box flex">
                        <div>
                            <TextInput
                                name="firstName"
                                label="First name"
                                value={searchTerms.firstName}
                                onChange={onSearchTermChange}
                                required={false}
                            />
                        </div>
                        <div className="ml-2">
                            <TextInput
                                name="lastName"
                                label="Last name"
                                value={searchTerms.lastName}
                                onChange={onSearchTermChange}
                                required={false}
                            />
                        </div>
                        <div className="ml-2">
                            <TextInput
                                name="stageName"
                                label="Stage name"
                                value={searchTerms.stageName}
                                onChange={onSearchTermChange}
                                required={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12">
                {people.map((person) => {
                    return (
                        <div key={person.id} className="col-span-12 my-2">
                            <div onClick={() => {onPersonSelected(person)}} className={`p-4 mx-2 bg-backgroundOffset cursor-pointer`}>
                                <p>{person.fullName}</p>
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
    searchTerms: PropTypes.object.isRequired,
    onSearchTermChange: PropTypes.func.isRequired,
    onPersonSelected: PropTypes.func.isRequired
};

export default SelectPersonCreditListWSearch;
