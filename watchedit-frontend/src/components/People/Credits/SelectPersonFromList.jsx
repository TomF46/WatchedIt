import PropTypes from "prop-types";

const SelectPersonFromList = ({ people, onPersonSelected }) => {
    return (
        <>
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
        </>
    );
};

SelectPersonFromList.propTypes = {
    people: PropTypes.array.isRequired,
    onPersonSelected: PropTypes.func.isRequired,
};

export default SelectPersonFromList;
