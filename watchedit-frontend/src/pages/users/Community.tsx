import UsersReel from '../../components/Users/UsersReel';

function Community() {
  return (
    <div className='users-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        Community
      </h1>
      <div className='mb-4 grid grid-cols-12'>
        <div className='col-span-12 mt-4 rounded bg-backgroundOffset p-4 shadow'>
          See what our most valued community members are watching, and what they
          think about the latest and greatest films.
        </div>
        <div className='col-span-12'>
          <UsersReel title='Biggest watchers' sort='watched_desc' />
        </div>
        <div className='col-span-12'>
          <UsersReel title='Best reviewers' sort='reviews_desc' />
        </div>
        <div className='col-span-12'>
          <UsersReel title='Best publishers' sort='articles_desc' />
        </div>
      </div>
    </div>
  );
}

export default Community;
