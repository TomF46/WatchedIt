import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";

const SelectPersonCreditListWSearch = ({ people, searchTerms, onSearchTermChange , onPersonSelected }) => {
    return (
        <>
            <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4 shadow">
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
                            <div className="grid grid-cols-24 bg-backgroundOffset shadow rounded cursor-pointer hover:opacity-75" onClick={() => {onPersonSelected(person)}}>
                                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                                    <img src={person.imageUrl} className="h-full headshot rounded-l" alt={`${person.fullName} headshot.`} />
                                </div>
                                <div className={`col-span-21 md:col-span-22 lg:col-span-23 p-4`}>
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
