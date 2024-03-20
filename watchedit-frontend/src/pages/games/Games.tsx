import { Link, useNavigate } from 'react-router-dom';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

function Games() {
  const userIsAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  return (
    <div className='games-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        Games
      </h1>
      {!userIsAuthenticated && (
        <div className='text-center'>
          <p className='my-4 text-center text-lg font-semibold text-primary'>
            Games are only available for logged in users, register now to play!
          </p>
          <Link
            to={'/register'}
            className='mt-4 rounded bg-primary px-4 py-2 text-white hover:opacity-75'
          >
            Register
          </Link>
        </div>
      )}
      <div className='my-4'>
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <div className='grid grid-cols-12 rounded bg-backgroundOffset shadow'>
              <div className='col-span-9 p-4 md:col-span-10'>
                <Link
                  to={'/games/connections'}
                  className='text-center text-xl text-primary'
                >
                  Connections
                </Link>
                <p>
                  Using credit clues guess which person shares roles in films
                  with all these characters/people
                </p>
              </div>
              <div
                onClick={() => {
                  navigate(`/games/connections`);
                }}
                className='col-span-3 flex cursor-pointer items-center justify-center bg-primary md:col-span-2'
              >
                <p>Play now</p>
              </div>
            </div>
          </div>
          <div className='col-span-12 mt-4 rounded bg-backgroundOffset shadow'>
            <div className='grid grid-cols-12'>
              <div className='col-span-9 p-4 md:col-span-10'>
                <Link
                  to={'/games/filmFromCast'}
                  className='text-center text-xl text-primary'
                >
                  Guess film from cast
                </Link>
                <p>
                  Using cast member clues guess the film they all appeared or
                  worked on together.
                </p>
              </div>
              <div
                onClick={() => {
                  navigate(`/games/filmFromCast`);
                }}
                className='col-span-3 flex cursor-pointer items-center justify-center bg-primary md:col-span-2'
              >
                <p>Play now</p>
              </div>
            </div>
          </div>
          <div className='col-span-12 mt-4'>
            <div className='grid grid-cols-12 rounded bg-backgroundOffset shadow'>
              <div className='col-span-9 p-4 md:col-span-10'>
                <Link
                  to={'/games/filmFromDescription'}
                  className='text-center text-xl text-primary'
                >
                  Guess film from description
                </Link>
                <p>
                  Guess as many films as you can in a row using just a
                  description.
                </p>
              </div>
              <div
                onClick={() => {
                  navigate(`/games/filmFromDescription`);
                }}
                className='col-span-3 flex cursor-pointer items-center justify-center bg-primary md:col-span-2'
              >
                <p>Play now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
