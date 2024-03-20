import { Link } from 'react-router-dom';
import FilmReel from '../components/Home/FilmReel/FilmReel';
import PeopleReel from '../components/Home/PeopleReel/PeopleReel';
import ListReel from '../components/Home/ListReel/ListReel';
import logo from '../assets/WatchedIt.webp';
import ReasonsToLoginSection from '../components/Home/ReasonsToLoginSection';
import UnreadNotifications from '../components/Home/UnreadNotifications/UnreadNotifications';
import FilmsComingSoonReel from '../components/Home/FilmReel/FilmsComingSoonReel';
import { useAppSelector } from '../redux/store';
import useIsAuthenticated from '../hooks/useIsAuthenticated';

function Home() {
  const userIsAuthenticated = useIsAuthenticated();
  const username = useAppSelector((state) =>
    state.authentication.tokens ? state.authentication.tokens.username : null,
  );

  return (
    <div className='Home'>
      <div className='grid grid-cols-12 text-center'>
        <div className='col-span-12 md:col-span-6 md:col-start-4'>
          <img src={logo} alt='Watched it logo' />
        </div>
      </div>
      {userIsAuthenticated ? (
        <p className='mt-4 text-center text-4xl text-primary'>
          Welcome {username}
        </p>
      ) : (
        <div className='text-center'>
          <p className='my-4 text-center text-xl font-semibold text-primary md:text-2xl lg:text-4xl'>
            Sign up now for reviews, ratings and more.
          </p>
          <Link
            to={'/register'}
            className='mt-4 rounded bg-primary px-4 py-2 text-white hover:opacity-75'
          >
            Register
          </Link>
          <ReasonsToLoginSection />
        </div>
      )}
      <div className='home-content grid-col-12 mt-4 grid'>
        {userIsAuthenticated && (
          <div className='col-span-12'>
            <UnreadNotifications />
          </div>
        )}
        <div className='col-span-12'>
          <FilmReel title='Latest films' sort='release_desc' onlyShowReleased />
        </div>
        <div className='col-span-12'>
          <PeopleReel
            title={'Most liked people'}
            subtitle={
              'The most liked people according to the WatchedIt community.'
            }
            sort='likes_desc'
          />
        </div>
        <div className='col-span-12'>
          <FilmReel
            title='Most watched films'
            sort='watched_desc'
            onlyShowReleased
          />
        </div>
        <div className='col-span-12'>
          <FilmReel
            title='Highest rated films'
            subtitle={'Our communities favourite films.'}
            sort='rating_desc'
            onlyShowReleased
          />
        </div>
        <div className='col-span-12'>
          <FilmsComingSoonReel
            title='Films coming soon'
            subtitle={'Count down the days, these films are coming out next!'}
            sort='release_asc'
          />
        </div>
        <div className='col-span-12'>
          <ListReel />
        </div>
      </div>
    </div>
  );
}

export default Home;
