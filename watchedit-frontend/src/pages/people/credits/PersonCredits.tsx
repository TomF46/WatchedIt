import { confirmAlert } from 'react-confirm-alert';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCreditsForPersonById, removeCredit } from '../../../api/creditsApi';
import { getPersonById } from '../../../api/peopleApi';
import PersonCreditsList from '../../../components/People/Credits/PersonCreditsList';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import PersonMiniDetail from '../../../components/People/PersonMiniDetail';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { useAppSelector } from '../../../redux/store';
import { Credit } from '../../../types/Credits';
import CameraIcon from '../../../components/Icons/CameraIcon';

function PersonCredits() {
  const { id } = useParams();
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);

  const { data: person, error: personLoadError } = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPersonById(Number(id)),
  });

  const { data: credits, refetch } = useQuery({
    queryKey: ['person-credits', id],
    queryFn: () =>
      getCreditsForPersonById(Number(id)).catch((error) => {
        toast.error(`Error getting person credits ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  const deleteCredit = useMutation({
    mutationFn: (creditToRemove: Credit) => removeCredit(creditToRemove),
    onSuccess: () => {
      toast.success('Credit removed');
      refetch();
    },
    onError: (err) => {
      toast.error(`Error removing persons credit ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleRemoveCredit(credit: Credit): void {
    confirmAlert({
      title: 'Confirm removal',
      message: `Are you sure you want to remove this credit?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCredit.mutate(credit),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  if (personLoadError) {
    return (
      <ErrorMessage
        message={'Error loading person.'}
        error={personLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='person-page'>
      {!person ? (
        <LoadingMessage message={'Loading person'} />
      ) : (
        <>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            {person.fullName} credits
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
                  to={`/people/${person.id}/credits/add`}
                  className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
                >
                  Add credit
                </Link>
              </div>
            </div>
          )}
          <div className='mt-4'>
            <PersonMiniDetail person={person} />
            {credits && (
              <>
                {credits.cast.length + credits.crew.length == 0 && (
                  <div className='my-16'>
                    <div className='flex justify-center text-center'>
                      <CameraIcon color='primary' height={14} width={14} />
                    </div>
                    <p className='text-center text-xl'>
                      This person does not have any credits.
                    </p>
                  </div>
                )}
                <div className='grid grid-cols-12'>
                  <div className='col-span-12'>
                    {credits.cast.length > 0 && (
                      <>
                        <h2 className='mt-4 text-xl text-primary '>Cast</h2>
                        <PersonCreditsList
                          credits={credits.cast}
                          canEdit={isAdmin}
                          onRemove={handleRemoveCredit}
                        />
                      </>
                    )}
                  </div>
                  <div className='col-span-12 mt-4'>
                    {credits.crew.length > 0 && (
                      <>
                        <h2 className='mt-4 text-xl text-primary '>Crew</h2>
                        <PersonCreditsList
                          credits={credits.crew}
                          canEdit={isAdmin}
                          onRemove={handleRemoveCredit}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default PersonCredits;
