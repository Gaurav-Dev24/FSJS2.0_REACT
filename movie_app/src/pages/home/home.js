import React, { useEffect, useState } from "react";
import "./home.css";
// for the crousel we need to import the css and the component itself which has been imported below
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    // whatever the response we get from api it will be stored in "popularMovies" as state
  const [popularMovies, setpopularMovies] = useState([]);

  // I want api call of popular movies list when the page is mounted, so we use useEffect to fetch the api.
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setpopularMovies(data.results));
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {
            popularMovies.map(movie => (
                // I have use link here because i want to open the movie descp. if user clicks anywhere on the crousel it will got routes name id which has been defined in app.js
                <Link style={{textDecoration: "none", color: "white"}} to = {`/movie/${movie.id}`}>
                
                {/*  */}
                <div className="posterImage">
                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="movie-img" />
                </div>
                <div className="posterImage__overlay">
                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                    <div className="posterImage__runtime">
                        {movie ? movie.release_date : ""}
                        <span className="posterImage__rating">
                            {movie ? movie.vote_average : ""}
                            <i className="fas fa-star"/>{" "}
                        </span>
                    </div>
                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                </div>
                </Link>
            ))
          }
        </Carousel>
        <MovieList />   
      </div>
    </>
  );
};

export default Home;
