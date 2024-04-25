import { toast } from 'react-toastify';
import LoadingMessage from '../../Loading/LoadingMessage';
import { searchPeopleByBirthdayPaginated } from '../../../api/peopleApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import PersonGrid from '../../People/PersonGrid';
import PaginationControls from '../../PaginationControls';
import { useState } from 'react';

function BirthdayReel() {
  const [page, setPage] = useState(1);
  const peoplePerPage = 8;
  const today = new Date().toISOString();

  const {
    isLoading,
    data: peoplePaginator,
    error,
  } = useQuery({
    queryKey: ['people-birthday', peoplePerPage, page],
    queryFn: () => searchPeopleByBirthdayPaginated(today, page, peoplePerPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <LoadingMessage message={'Loading people.'} />;

  if (error) {
    toast.error(`Error getting people ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (peoplePaginator && peoplePaginator.data.length > 0)
    return (
      <div className='birthday-reel'>
        <div className='mt-4'>
          <h3 className='text-2xl font-semibold text-primary'>
            Todays Birthdays
          </h3>
          <PersonGrid people={peoplePaginator.data} />
          <PaginationControls
            currentPage={page}
            onPageChange={setPage}
            of={peoplePaginator.of}
            from={peoplePaginator.from}
            to={peoplePaginator.to}
            lastPage={peoplePaginator.lastPage}
          />
        </div>
      </div>
    );
}

export default BirthdayReel;
