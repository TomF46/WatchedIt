import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Header from "./components/Header/Header";
import List from "./pages/lists/List";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddCreditForFilm from "./pages/films/credits/AddCreditForFilm";
import FilmCredits from "./pages/films/credits/FilmCredits";
import Film from "./pages/films/Film";
import Films from "./pages/films/Films";
import Home from "./pages/Home";
import Lists from "./pages/lists/Lists";
import AddCreditForPerson from "./pages/people/credits/AddCreditForPerson";
import PersonCredits from "./pages/people/credits/PersonCredits";
import People from "./pages/people/People";
import Person from "./pages/people/Person";
import Profile from "./pages/profile/Profile";
import WatchedList from "./pages/profile/WatchedList";
import NotFound from "./pages/status/NotFound";
import AddFilmToList from "./pages/lists/manage/AddFilmToList";
import EditCredit from "./pages/credits/manage/EditCredit";
import Reviews from "./pages/films/reviews/Reviews";
import Review from "./pages/films/reviews/Review";
import Categories from "./pages/categories/Categories";
import Category from "./pages/categories/Category";
import ManageProfile from "./pages/profile/manage/ManageProfile";
import UserLikes from "./pages/profile/UserLikes";
import Notifications from "./pages/notifications/Notifications";
import FilmTrivia from "./pages/films/trivia/FilmTrivia";
import Games from "./pages/games/Games";
import GuessFilmFromCast from "./pages/games/GuessFilmFromCast/GuessFilmFromCast";
import GuessFilmFromCastGame from "./pages/games/GuessFilmFromCast/GuessFilmFromCastGame";
import GuessFilmFromDescription from "./pages/games/GuessFilmFromDescription/GuessFilmFromDescription";
import GuessFilmFromDescriptionGame from "./pages/games/GuessFilmFromDescription/GuessFilmFromDescriptionGame";
import GuessFilmFromDescriptionLeaderboard from "./pages/games/GuessFilmFromDescription/GuessFilmFromDescriptionLeaderboard";
import Connections from "./pages/games/Connections/Connections";
import ConnectionsGame from "./pages/games/Connections/ConnectionsGame";
import News from "./pages/news/News";
import NewsArticle from "./pages/news/NewsArticle";
import PublisherRoute from "./PublisherRoute";
import UsersNewsArticles from "./pages/news/UsersNewsArticles";
import UsersReviews from "./pages/profile/reviews/UsersReviews";
import Community from "./pages/users/Community";
import AddPerson from "./pages/people/manage/AddPerson";
import EditPerson from "./pages/people/manage/EditPerson";
import EditFilm from "./pages/films/manage/EditFilm";
import AddFilm from "./pages/films/manage/AddFilm";
import EditList from "./pages/lists/manage/EditList";
import AddList from "./pages/lists/manage/AddList";
import AddCategory from "./pages/categories/manage/AddCategory";
import EditCategory from "./pages/categories/manage/EditCategory";
import EditReview from "./pages/films/reviews/EditReview";
import AddReview from "./pages/films/reviews/AddReview";
import EditTrivia from "./pages/films/trivia/EditFilmTrivia";
import AddTrivia from "./pages/films/trivia/AddFilmTrivia";
import EditArticle from "./pages/news/EditNewsArticle";
import AddArticle from "./pages/news/AddNewsArticle";
import AdminRoute from "./AdminRoute";

const App = () => {
  return (
    <>
      <div className="bg-background">
        <Header />
        <div className="app-container container mx-auto px-4 lg:px-0 mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/films/:id/reviews/:reviewId/edit"
              element={
                <AuthenticatedRoute>
                  <EditReview />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/films/:id/reviews/add"
              element={
                <AuthenticatedRoute>
                  <AddReview />
                </AuthenticatedRoute>
              }
            />
            <Route path="/films/:id/reviews/:reviewId" element={<Review />} />
            <Route path="/films/:id/reviews" element={<Reviews />} />
            <Route
              path="/films/:id/trivia/:triviaId/edit"
              element={
                <AuthenticatedRoute>
                  <EditTrivia />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/films/:id/trivia/add"
              element={
                <AuthenticatedRoute>
                  <AddTrivia />
                </AuthenticatedRoute>
              }
            />
            <Route path="/films/:id/trivia" element={<FilmTrivia />} />
            <Route
              path="/films/:id/credits/add"
              element={
                <AdminRoute>
                  <AddCreditForFilm />
                </AdminRoute>
              }
            />
            <Route
              path="/films/:id/credits/:creditId/edit"
              element={
                <AdminRoute>
                  <EditCredit />
                </AdminRoute>
              }
            />
            <Route path="/films/:id/credits" element={<FilmCredits />} />
            <Route
              path="/films/:id/edit"
              element={
                <AdminRoute>
                  <EditFilm />
                </AdminRoute>
              }
            />
            <Route
              path="/films/add"
              element={
                <AdminRoute>
                  <AddFilm />
                </AdminRoute>
              }
            />
            <Route path="/films/:id" element={<Film />} />
            <Route path="/films" element={<Films />} />
            <Route
              path="/people/:id/credits/add"
              element={
                <AdminRoute>
                  <AddCreditForPerson />
                </AdminRoute>
              }
            />
            <Route
              path="/people/:id/credits/:creditId/edit"
              element={
                <AdminRoute>
                  <EditCredit />
                </AdminRoute>
              }
            />
            <Route path="/people/:id/credits" element={<PersonCredits />} />
            <Route
              path="/people/:id/edit"
              element={
                <AdminRoute>
                  <EditPerson />
                </AdminRoute>
              }
            />
            <Route
              path="/people/add"
              element={
                <AdminRoute>
                  <AddPerson />
                </AdminRoute>
              }
            />
            <Route path="/people/:id" element={<Person />} />
            <Route path="/people" element={<People />} />
            <Route
              path="/lists/:id/add"
              element={
                <AuthenticatedRoute>
                  <AddFilmToList />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/lists/:id/edit"
              element={
                <AuthenticatedRoute>
                  <EditList />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/lists/add"
              element={
                <AuthenticatedRoute>
                  <AddList />
                </AuthenticatedRoute>
              }
            />
            <Route path="/lists/:id" element={<List />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/profile/:id/likes" element={<UserLikes />} />
            <Route
              path="/profile/likes/"
              element={
                <AuthenticatedRoute>
                  <UserLikes />
                </AuthenticatedRoute>
              }
            />
            <Route path="/profile/:id/watched" element={<WatchedList />} />
            <Route
              path="/profile/watched"
              element={
                <AuthenticatedRoute>
                  <WatchedList />
                </AuthenticatedRoute>
              }
            />
            <Route path="/profile/:id/reviews" element={<UsersReviews />} />
            <Route
              path="/profile/reviews"
              element={
                <AuthenticatedRoute>
                  <UsersReviews />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <AuthenticatedRoute>
                  <ManageProfile />
                </AuthenticatedRoute>
              }
            />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="/profile"
              element={
                <AuthenticatedRoute>
                  <Profile />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <AuthenticatedRoute>
                  <Notifications />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/categories/add"
              element={
                <AdminRoute>
                  <AddCategory />
                </AdminRoute>
              }
            />
            <Route
              path="/categories/:id/edit"
              element={
                <AdminRoute>
                  <EditCategory />
                </AdminRoute>
              }
            />
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/games/filmFromCast/:id"
              element={
                <AuthenticatedRoute>
                  <GuessFilmFromCastGame />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/games/filmFromCast"
              element={
                <AuthenticatedRoute>
                  <GuessFilmFromCast />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/games/filmFromDescription/leaderboard"
              element={
                <AuthenticatedRoute>
                  <GuessFilmFromDescriptionLeaderboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/games/filmFromDescription/:id"
              element={
                <AuthenticatedRoute>
                  <GuessFilmFromDescriptionGame />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/games/filmFromDescription"
              element={
                <AuthenticatedRoute>
                  <GuessFilmFromDescription />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/games/connections/:id"
              element={
                <AuthenticatedRoute>
                  <ConnectionsGame />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/games/connections"
              element={
                <AuthenticatedRoute>
                  <Connections />
                </AuthenticatedRoute>
              }
            />
            <Route path="/games" element={<Games />} />
            <Route
              path="/news/:id/edit"
              element={
                <PublisherRoute>
                  <EditArticle />
                </PublisherRoute>
              }
            />
            <Route
              path="/news/add"
              element={
                <PublisherRoute>
                  <AddArticle />
                </PublisherRoute>
              }
            />
            <Route path="/profile/:id/news" element={<UsersNewsArticles />} />
            <Route
              path="/profile/news"
              element={
                <AuthenticatedRoute>
                  <UsersNewsArticles />
                </AuthenticatedRoute>
              }
            />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/news" element={<News />} />
            <Route path="/community" element={<Community />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

export default App;
