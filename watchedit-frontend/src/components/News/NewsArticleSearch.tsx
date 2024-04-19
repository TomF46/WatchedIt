import { useEffect, useState } from 'react';
import SelectInput from '../Inputs/SelectInput';
import TextInput from '../Inputs/TextInput';
import { NewsArticleSearchParameters } from '../../types/News';

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  onQueryChange: (query: NewsArticleSearchParameters) => void;
  showSearchByPublisher: boolean;
};

const NewsArticleSearch = ({
  onQueryChange,
  page,
  onPageChange,
  showSearchByPublisher,
}: Props) => {
  const [searchTerms, setSearchTerms] = useState<NewsArticleSearchParameters>({
    title: '',
    publisher: '',
    sort: 'created_desc',
  });

  const sortOptions = [
    { id: 'created_asc', name: 'Oldest' },
    { id: 'created_desc', name: 'Latest' },
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
              name='title'
              label='Title'
              value={searchTerms.title}
              onChange={handleSearchTermChange}
              required={false}
            />
          </div>
          {showSearchByPublisher && (
            <div className='ml-2'>
              <TextInput
                name='publisher'
                label='Publisher'
                value={searchTerms.publisher}
                onChange={handleSearchTermChange}
                required={false}
              />
            </div>
          )}
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

export default NewsArticleSearch;
