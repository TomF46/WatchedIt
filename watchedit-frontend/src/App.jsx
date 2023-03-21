import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Film from "./pages/films/Film";
import Films from "./pages/films/Films";
import Home from "./pages/Home";
import People from "./pages/people/People";
import Person from "./pages/people/Person";
  
  const App = () => {
    return (
      <>
      <div className="bg-background">
        <Header />
        <div className="app-container container mx-auto">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/films/:id" element={<Film />}/>
            <Route path="/films" element={<Films />}/>
            <Route path="/people/:id" element={<Person />}/>
            <Route path="/people" element={<People />}/>
          </Routes>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
      </>
    )
  };
  
  export default App;
