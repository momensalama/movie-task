import {
  contextValues,
  useMovies,
  viewedMovieTypes,
} from "../context/useMovie";
import MovieDetails from "../components/MovieDetails";
import { useState } from "react";

export type movieType = {
  movie: viewedMovieTypes;
};

function Movie({ movie }: movieType) {
  const { handleSelectMovie } = useMovies() as contextValues;
  const [isOpend, setIsOpend] = useState(false);

  function handleSelect(id: string | undefined): void {
    handleSelectMovie(id);
    setIsOpend((open) => !open);
  }

  return (
    <div className={`movie ${isOpend && "active"}`}>
      <figure onClick={() => handleSelect(movie.imdbID)}>
        <img src={movie.Poster} alt={movie.Title} />
        <figcaption>{movie.Title}</figcaption>
      </figure>
      {isOpend && (
        <>
          <div className="arrow-down">
            <span></span>
          </div>
          <MovieDetails />
        </>
      )}
    </div>
  );
}

export default Movie;
