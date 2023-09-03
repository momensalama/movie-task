import { movieType } from "./Movie";

function RecentMovie({ movie }: movieType) {
  return (
    <div className="movie_slide">
      <figure key={movie.imdbID}>
        <img src={movie?.Poster} alt={`${movie.Title} Poster`} />
      </figure>
    </div>
  );
}

export default RecentMovie;
