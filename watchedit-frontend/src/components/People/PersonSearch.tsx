import { useEffect, useState } from 'react';
import { PersonSearchParameters } from '../../types/People';
import TextInput from '../Inputs/TextInput';
import SelectInput from '../Inputs/SelectInput';

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  onQueryChange: (query: PersonSearchParameters) => void;
};

const PersonSearch = ({ onQueryChange, page, onPageChange }: Props) => {
  const [searchTerms, setSearchTerms] = useState<PersonSearchParameters>({
    firstName: '',
    lastName: '',
    stageName: '',
    sort: 'likes_desc',
  });

  const sortOptions = [
    { id: 'fName_asc', name: 'First name A - Z' },
    { id: 'fName_desc', name: 'First name Z - A' },
    { id: 'lName_asc', name: 'Last name A - Z' },
    { id: 'lName_desc', name: 'Last name Z - A' },
    { id: 'likes_desc', name: 'Most likes' },
    { id: 'likes_asc', name: 'Least likes' },
    { id: 'dob_asc', name: 'Oldest' },
    { id: 'dob_desc', name: 'Youngest' },
  ];

  useEffect(() => {
    onQueryChange(searchTerms);
  }, [searchTerms, onQueryChange]);

  function handleSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: value,
    }));
    if (page != 1) onPageChange(1);
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      sort: value,
    }));
    if (page != 1) onPageChange(1);
  }

  return (
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
              onChange={handleSearchTermChange}
              required={false}
            />
          </div>
          <div className='ml-2'>
            <TextInput
              name='lastName'
              label='Last name'
              value={searchTerms.lastName}
              onChange={handleSearchTermChange}
              required={false}
            />
          </div>
          <div className='ml-2'>
            <TextInput
              name='stageName'
              label='Stage name'
              value={searchTerms.stageName}
              onChange={handleSearchTermChange}
              required={false}
            />
          </div>
          <div className='ml-2'>
            <SelectInput
              name='sort'
              label='Sort'
              value={searchTerms.sort}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonSearch;
