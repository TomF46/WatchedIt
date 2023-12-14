import UsersReel from "../../components/Users/UsersReel";

function Community() {
  return (
    <div className="users-page">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">
        Community
      </h1>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-12 mt-4 bg-backgroundOffset p-4 shadow rounded">
          See what our most valued community members are watching, and what they
          think about the latest and greatest films.
        </div>
        <div className="col-span-12">
          <UsersReel
            title="Users with most watched films"
            sort="watched_desc"
          />
        </div>
        <div className="col-span-12">
          <UsersReel title="Users with most reviews" sort="reviews_desc" />
        </div>
        <div className="col-span-12">
          <UsersReel
            title="Users with most news articles"
            sort="articles_desc"
          />
        </div>
      </div>
    </div>
  );
}

export default Community;
