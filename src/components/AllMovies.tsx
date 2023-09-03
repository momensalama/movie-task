import { contextValues, useMovies } from "../context/useMovie";
import Movie from "../ui/Movie";

function AllMovies() {
  const { movies, activeButton, handleButtonClick, isLoading } =
    useMovies() as contextValues;

  return (
    <section className="all-movies__section">
      <div className="btns">
        <button
          className={`movies_btn btn ${
            activeButton === "movie" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("movie")}
        >
          Movies
        </button>
        <button
          className={`series_btn btn ${
            activeButton === "series" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("series")}
        >
          Series
        </button>
      </div>
      {isLoading ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="movies-container">
          {movies?.map((movie) => (
            <Movie key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AllMovies;
