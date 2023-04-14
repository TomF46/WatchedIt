import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";

const SelectPersonCreditListWSearch = ({ people, searchTerms, onSearchTermChange , onPersonSelected }) => {
    return (
        <>
            <div className="search-controls bg-backgroundOffset mt-4 rounded-md mb-4">
                <div className="bg-backgroundOffset2 rounded-t-md">
                    <p className="text-primary font-bold text-lg px-2 py-1">
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
            {people.length > 0 ? (
                <div className="grid grid-cols-12">
                {people.map((person) => {
                    return (
                        <div key={person.id} className="col-span-12 my-1">
                            <div className="grid grid-cols-24 bg-backgroundOffset">
                                <div className="col-span-1">
                                    <img src={person.imageUrl} className="h-full headshot" />
                                </div>
                                <div onClick={() => {onPersonSelected(person)}} className={`col-span-23 p-4 mx-2 cursor-pointer hover:opacity-75`}>
                                    <p>{person.fullName}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            ) : (
                <p className="text-center text-primary text-2xl">No people match your search</p>
            )}
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
