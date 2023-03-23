import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./adminRoute";
import AuthenticatedRoute from "./authenticatedRoute";
import Header from "./components/Header/Header";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Film from "./pages/films/Film";
import Films from "./pages/films/Films";
import Home from "./pages/Home";
import People from "./pages/people/People";
import Person from "./pages/people/Person";
import Profile from "./pages/profile/Profile";
import WatchedList from "./pages/profile/WatchedList";
import NotFound from "./pages/status/NotFound";
  
  const App = () => {
    return (
      <>
      <div className="bg-background">
        <Header />
        <div className="app-container container mx-auto">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/films/:id" element={<Film />}/>
            <Route path="/films" element={<Films />}/>
            <Route path="/people/:id" element={<Person />}/>
            <Route path="/people" element={<People />}/>
            <Route path="/profile/:id/watched" element={<AuthenticatedRoute><WatchedList /></AuthenticatedRoute>}/>
            <Route path="/profile/watched" element={<AuthenticatedRoute><WatchedList /></AuthenticatedRoute>}/>
            <Route path="/profile/:id" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>}/>
            <Route path="/profile" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>}/>
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>}/>
            <Route path="/404" element={<NotFound />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
      </>
    )
  };
  
  export default App;
