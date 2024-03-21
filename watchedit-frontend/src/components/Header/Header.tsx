import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderLoginForm from './HeaderLoginForm';
import logo from '../../assets/WatchedIt.webp';
import { AppDispatch, useAppDispatch } from '../../redux/store';
import { checkUserIsAdmin } from '../../redux/reducers/adminReducer';
import { loadNotificationCount } from '../../redux/reducers/notificationsReducer';
import BellIcon from '../Icons/BellIcon';
import PersonIcon from '../Icons/PersonIcon';
import EnterIcon from '../Icons/EnterIcon';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import useNotifictionCount from '../../hooks/useNotificationCount';

function Header() {
  const dispatch: AppDispatch = useAppDispatch();
  const userIsAuthenticated = useIsAuthenticated();
  const notificationCount = useNotifictionCount();
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserIsAdmin());
  }, [userIsAuthenticated, dispatch]);

  useEffect(() => {
    setMobileIsOpen(false);
    if (userIsAuthenticated) dispatch(loadNotificationCount());
  }, [location, userIsAuthenticated, dispatch]);

  function toggleMobileNavigation() {
    setMobileIsOpen(!mobileIsOpen);
  }

  return (
    <nav className='flex flex-wrap items-center justify-between bg-backgroundOffset px-4 py-2 shadow-lg'>
      <div className='mx-auto flex flex-shrink-0 items-center text-white lg:mr-6'>
        <Link to='/' className='tracking-tight' aria-label='To home'>
          <img
            src={logo}
            alt='Watched it logo'
            className='h-full w-32 text-center'
          />
        </Link>
      </div>
      <div className='block md:hidden'>
        <button
          className='pointer flex items-center rounded border border-teal-400 px-3 py-2 text-white hover:border-white'
          onClick={toggleMobileNavigation}
        >
          <svg
            className='h-3 w-3 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div
        className={`${
          mobileIsOpen ? 'block' : 'hidden'
        } w-full flex-grow md:flex md:w-auto md:items-center`}
      >
        <div className='py-4 text-center text-sm md:flex-grow md:text-left'>
          <Link
            to='/'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            Home
          </Link>
          <Link
            to='/films'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            Films
          </Link>
          <Link
            to='/people'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            People
          </Link>
          <Link
            to='/news'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            News
          </Link>
          <Link
            to='/lists'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            Lists
          </Link>
          <Link
            to='/games'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            Games
          </Link>
          <Link
            to='/community'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            Community
          </Link>
          <Link
            to='/films/calendar'
            className='mt-4 block text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
          >
            Calander
          </Link>
        </div>
        <div className='mt-2 border-t text-center md:mt-0 md:border-0 md:text-left'>
          {!userIsAuthenticated && (
            <>
              <div className='hidden lg:block'>
                <HeaderLoginForm />
              </div>
              <div className='blog my-2 md:my-0 lg:hidden'>
                <Link
                  to='/login'
                  className='inline-flex items-center rounded bg-primary px-4 py-2 text-white hover:opacity-75'
                >
                  <EnterIcon color='white' height={5} width={5} />
                  <span className='ml-1'>Login</span>
                </Link>
              </div>
            </>
          )}
          {userIsAuthenticated && (
            <>
              <Link
                to='/notifications'
                className='mr-2 mt-4 inline-flex items-center text-sm text-primary hover:opacity-75 md:mt-0 md:px-4 md:py-2 md:leading-none md:hover:shadow'
              >
                <BellIcon color='primary' height={6} width={6} />
                {notificationCount > 0 && (
                  <span className='ml-1'>{notificationCount}</span>
                )}
              </Link>
              <Link
                to='/profile'
                className='mt-4 inline-flex items-center text-primary hover:opacity-75 md:mx-4 md:mt-0 md:inline-block'
              >
                <PersonIcon
                  color='primary'
                  height={6}
                  width={6}
                  strokeWidth={1.5}
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
