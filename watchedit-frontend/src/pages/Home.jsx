import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FilmReel from "../components/Home/FilmReel/FilmReel";
import PeopleReel from "../components/Home/PeopleReel/PeopleReel";
import ListReel from "../components/Home/ListReel/ListReel";
import logo from "../assets/WatchedIt.webp";
import ReasonsToLoginSection from "../components/Home/ReasonsToLoginSection";
import UnreadNotifications from "../components/Home/UnreadNotifications/UnreadNotifications";

function Home() {
  const userIsAuthenticated = useSelector((state) => state.tokens != null);
  const username = useSelector((state) =>
    state.tokens ? state.tokens.username : null,
  );
  return (
    <div className="Home">
      <div className="text-center grid grid-cols-12">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <img src={logo} alt="Watched it logo" />
        </div>
      </div>
      {userIsAuthenticated ? (
        <p className="text-center text-primary text-4xl mt-4">
          Welcome {username}
        </p>
      ) : (
        <div className="text-center">
          <p className="text-center text-primary text-xl md:text-2xl lg:text-4xl my-4 font-semibold">
            Sign up now for reviews, ratings and more.
          </p>
          <Link
            to={"/register"}
            className="bg-primary text-white rounded py-2 px-4 mt-4 hover:opacity-75"
          >
            Register
          </Link>
          <ReasonsToLoginSection />
        </div>
      )}
      <div className="home-content grid grid-col-12 mt-4">
        {userIsAuthenticated && (
          <div className="col-span-12">
            <UnreadNotifications />
          </div>
        )}
        <div className="col-span-12">
          <FilmReel title="Latest films" sort="release_desc" />
        </div>
        <div className="col-span-12">
          <PeopleReel title={"Most liked people"} sort="likes_desc" />
        </div>
        <div className="col-span-12">
          <FilmReel title="Most watched films" sort="watched_desc" />
        </div>
        <div className="col-span-12">
          <FilmReel title="Highest rated films" sort="rating_desc" />
        </div>
        <div className="col-span-12">
          <ListReel />
        </div>
      </div>
    </div>
  );
}

export default Home;
