import TextInput from '../../Inputs/TextInput';
import SelectPersonFromCards from './SelectPersonFromCards';
import SelectPersonFromList from './SelectPersonFromList';
import { PersonSearchParameters, Person } from '../../../types/People';

type Props = {
  people: Person[];
  searchTerms: PersonSearchParameters;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPersonSelected: (person: Person) => void;
  cardMode: boolean;
};

const SelectPersonWSearch = ({
  people,
  searchTerms,
  onSearchTermChange,
  onPersonSelected,
  cardMode,
}: Props) => {
  return (
    <>
      <div className='controls mb-4 mt-4 rounded-md bg-backgroundOffset shadow'>
        <div className='rounded-t-md bg-backgroundOffset2'>
          <p className='px-2 py-1 text-lg font-semibold text-primary'>Search</p>
        </div>
        <div className='px-2 py-2'>
          <div className='search-box flex'>
            <div>
              <TextInput
                name='firstName'
                label='First name'
                value={searchTerms.firstName}
                onChange={onSearchTermChange}
                required={false}
              />
            </div>
            <div className='ml-2'>
              <TextInput
                name='lastName'
                label='Last name'
                value={searchTerms.lastName}
                onChange={onSearchTermChange}
                required={false}
              />
            </div>
            <div className='ml-2'>
              <TextInput
                name='stageName'
                label='Stage name'
                value={searchTerms.stageName}
                onChange={onSearchTermChange}
                required={false}
              />
            </div>
          </div>
        </div>
      </div>
      {people.length > 0 ? (
        <div className={`grid  ${cardMode ? 'grid-cols-16' : 'grid-cols-12'}`}>
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
        <p className='text-center text-2xl text-primary'>
          No people match your search
        </p>
      )}
    </>
  );
};

export default SelectPersonWSearch;
