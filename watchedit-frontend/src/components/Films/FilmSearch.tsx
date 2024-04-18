import { useEffect, useState } from 'react';
import RatingInput from '../Inputs/RatingInput';
import SelectInput from '../Inputs/SelectInput';
import TextInput from '../Inputs/TextInput';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/categoriesApi';
import { toast } from 'react-toastify';
import { FilmSearchParameters } from '../../types/Films';

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  onQueryChange: (query: FilmSearchParameters) => void;
};

const FilmSearch = ({ onQueryChange, page, onPageChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [ratings, setRatings] = useState({
    maxRating: undefined,
    minRating: undefined,
  });
  const [sort, setSort] = useState('rating_desc');
  const sortOptions = [
    { id: 'name_asc', name: 'A - Z' },
    { id: 'name_desc', name: 'Z - A' },
    { id: 'release_desc', name: 'Newest' },
    { id: 'release_asc', name: 'Oldest' },
    { id: 'rating_desc', name: 'Highest rated' },
    { id: 'rating_asc', name: 'Lowest rated' },
    { id: 'watched_desc', name: 'Most watched' },
    { id: 'watched_asc', name: 'Least watched' },
  ];

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories()
        .then((res) => {
          return res;
        })
        .catch((error) => {
          toast.error(`Error getting categories ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        }),
  });

  useEffect(() => {
    onQueryChange({
      searchTerm: searchTerm,
      category: category,
      sort: sort,
      maxRating: ratings.maxRating,
      minRating: ratings.minRating,
    } as FilmSearchParameters);
  }, [
    searchTerm,
    category,
    sort,
    ratings.maxRating,
    ratings.minRating,
    onQueryChange,
  ]);

  function handleSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) onPageChange(1);
  }

  function handleCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { value } = event.target;
    if (isNaN(Number(value))) {
      setCategory(undefined);
    } else {
      setCategory(Number(value));
    }
    if (page != 1) onPageChange(1);
  }
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    setSort(value);
    if (page != 1) onPageChange(1);
  }

  function handleRatingsChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;
    const converted = Number(value);
    if (converted < 0 || converted > 10) return;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: Number(value),
    }));
    if (page != 1) onPageChange(1);
  }

  return (
    <div className='search-controls mb-4 mt-4 rounded bg-backgroundOffset shadow'>
      <div className='rounded-t-md bg-backgroundOffset2'>
        <p className='px-2 py-1 text-lg font-semibold text-primary'>Search</p>
      </div>
      <div className='px-2 py-2'>
        <div className='search-box grid grid-cols-12'>
          <div className='col-span-12 px-2 md:col-span-4 lg:col-span-2'>
            <TextInput
              name='searchTerm'
              label='Search'
              value={searchTerm}
              onChange={handleSearchTermChange}
              required={false}
            />
          </div>
          {categories && categories.length > 0 && (
            <div className='col-span-12 px-2 md:col-span-3 lg:col-span-2'>
              <SelectInput
                name='category'
                label='Category'
                defaultText='All'
                value={category}
                options={categories}
                onChange={handleCategoryChange}
              />
            </div>
          )}
          <div className='col-span-6 px-2 md:col-span-2 lg:col-span-1'>
            <RatingInput
              name='minRating'
              label='Min Rating'
              value={ratings.minRating}
              onChange={handleRatingsChange}
              required={false}
            />
          </div>
          <div className='col-span-6 px-2 md:col-span-2 lg:col-span-1'>
            <RatingInput
              name='maxRating'
              label='Max Rating'
              value={ratings.maxRating}
              onChange={handleRatingsChange}
              required={false}
            />
          </div>
          <div className='col-span-12 px-2 md:col-span-3 lg:col-span-2'>
            <SelectInput
              name='sort'
              label='Sort'
              value={sort}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmSearch;
