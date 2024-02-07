import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";
import SelectPersonFromCards from "./SelectPersonFromCards";
import SelectPersonFromList from "./SelectPersonFromList";

const SelectPersonWSearch = ({
  people,
  searchTerms,
  onSearchTermChange,
  onPersonSelected,
  cardMode,
}) => {
  return (
    <>
      <div className="controls bg-backgroundOffset mt-4 rounded-md mb-4 shadow">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-lg px-2 py-1">Search</p>
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
        <div className={`grid  ${cardMode ? "grid-cols-16" : "grid-cols-12"}`}>
          {cardMode ? (
            <SelectPersonFromCards
              people={people}
              onPersonSelected={onPersonSelected}
            />
          ) : (
            <SelectPersonFromList
              people={people}
              onPersonSelected={onPersonSelected}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-primary text-2xl">
          No people match your search
        </p>
      )}
    </>
  );
};

SelectPersonWSearch.propTypes = {
  people: PropTypes.array.isRequired,
  searchTerms: PropTypes.object.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  onPersonSelected: PropTypes.func.isRequired,
  cardMode: PropTypes.bool.isRequired,
};

export default SelectPersonWSearch;
