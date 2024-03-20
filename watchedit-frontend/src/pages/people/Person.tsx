import { toast } from 'react-toastify';
import { getPersonById, removePerson } from '../../api/peopleApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import PersonCreditsOverviewList from '../../components/People/Credits/PersonCreditsOverviewList';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { format, parseISO } from 'date-fns';
import LikedPersonControls from '../../components/People/Likes/LikedPersonControls';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { useAppSelector } from '../../redux/store';
import { Person as PersonType } from '../../types/People';
import ThumbsUpIcon from '../../components/Icons/ThumbsUpIcon';

function Person() {
  const { id } = useParams();
  const userIsAuthenticated = useAppSelector(
    (state) => state.authentication.tokens != null,
  );
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const navigate = useNavigate();

  const {
    isLoading,
    data: person,
    error,
    refetch,
  } = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPersonById(Number(id)),
  });

  const deletePerson = useMutation({
    mutationFn: (personToRemove: PersonType) => removePerson(personToRemove),
    onSuccess: () => {
      toast.success('Person removed');
      navigate('/people');
    },
    onError: (err) => {
      toast.error(`Error removing person ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmDelete(): void {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to remove ${person!.fullName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletePerson.mutate(person!),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function handleLikesCountChange(): void {
    refetch();
  }

  if (isLoading) return <LoadingMessage message={'Loading person.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading person.'}
        error={error.data.Exception}
      />
    );
  }
  if (person)
    return (
      <div className='person-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          {person.fullName}
        </h1>
        {isAdmin && (
          <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Admin controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <Link
                to={`/people/${id}/edit`}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Edit person
              </Link>
              <button
                onClick={() => {
                  confirmDelete();
                }}
                className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-red-400 hover:opacity-75'
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className='mt-4 grid grid-cols-12'>
          <div className='col-span-12 md:col-span-2'>
            <img
              src={person.imageUrl}
              className='headshot rounded shadow'
              alt={`${person.fullName} headshot.`}
            />
            <div className='flex flex-col'>
              {userIsAuthenticated && (
                <LikedPersonControls
                  person={person}
                  onChange={handleLikesCountChange}
                />
              )}
              <Link
                to={`/people/${id}/credits`}
                className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Credits
              </Link>
            </div>
          </div>
          <div className='col-span-12 mt-4 md:col-span-10 md:mt-0 md:pl-4'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 rounded bg-backgroundOffset p-2 shadow md:col-span-5'>
                <h3 className='text-xl text-primary'>Details</h3>
                <p>First name: {person.firstName}</p>
                <p>Last name: {person.lastName}</p>
                {person.middleNames && (
                  <p>Middle names: {person.middleNames}</p>
                )}
                {person.stageName && <p>Stage name: {person.stageName}</p>}
                <p>
                  DOB:{' '}
                  {format(
                    parseISO(person.dateOfBirth.toString()),
                    'dd/MM/yyyy',
                  )}
                </p>
              </div>
              <div className='col-span-12 rounded bg-backgroundOffset p-2 shadow md:col-span-5 md:ml-2'>
                <h3 className='font-semiboldf text-xl text-primary'>About</h3>
                <p>{person.description}</p>
              </div>
              <div className='col-span-12 rounded bg-success p-4 text-center shadow md:col-span-2 md:ml-2'>
                <h3 className='mb-4 text-xl font-semibold text-black'>Likes</h3>
                <p className='text-2xl font-semibold text-black'>
                  {person.likedByCount}
                </p>
                <div className='mt-4 inline-flex items-center'>
                  <ThumbsUpIcon color='black' height={10} width={10} />
                </div>
              </div>
            </div>
            <div className='col-span-12'>
              <div className='grid grid-cols-12'>
                <div className='col-span-12'>
                  {person.credits.cast.length > 0 && (
                    <>
                      <h2 className='mt-4 text-xl text-primary '>As cast</h2>
                      <PersonCreditsOverviewList
                        credits={person.credits.cast}
                      />
                    </>
                  )}
                </div>
                <div className='col-span-12 mt-4'>
                  {person.credits.crew.length > 0 && (
                    <>
                      <h2 className='mt-4 text-xl text-primary '>As crew</h2>
                      <PersonCreditsOverviewList
                        credits={person.credits.crew}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Person;
