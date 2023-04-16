import './App.css';
// importing router from react-router-dom to navigate between the pages such as homepage, movie-list, movie-details
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';

function App() {
  return (
    <div className="App">
      {/* using the router and creating the different links */}
      <Router>
        <Header /> {/* Header Imported */}

        <Routes>
          <Route index element = {<Home />}></Route>
          {/* this route will render the path matched to "movie/:id" */}
          <Route path= "movie/:id" element={<Movie/>}></Route>

          {/* this route will render the path matched to "movie/:id" */}
          <Route path= "movies/:type" element={<MovieList/>}></Route>

          {/* this route will render the error page */}
          <Route path= "/*" element={<h1> Error Page</h1>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
