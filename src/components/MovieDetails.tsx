import { HiStar } from "react-icons/hi2";
import { contextValues, useMovies } from "../context/useMovie";
import { Link } from "react-router-dom";

function MovieDetails() {
  const { movie, addRecentView } = useMovies() as contextValues;
  const {
    Title: title,
    Language: language,
    Poster: poster,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
    imdbID,
  } = movie;

  const directors = director?.split(",");
  const genres = genre?.split(",");

  return (
    <div
      className="pop-up"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
      }}
    >
      <div className="pop-up_content">
        <h3>{title}</h3>
        <p>{plot}</p>
        <div className="details">
          <div className="rating col">
            <h4>Rating</h4>
            <div className="stars">
              {Math.round(Number(imdbRating)) >= 2 && (
                <HiStar className="active" />
              )}
              {Math.round(Number(imdbRating)) >= 4 && (
                <HiStar className="active" />
              )}
              {Math.round(Number(imdbRating)) >= 5 && (
                <HiStar className="active" />
              )}
              {Math.round(Number(imdbRating)) >= 7 && (
                <HiStar className="active" />
              )}
              {Math.round(Number(imdbRating)) >= 10 && (
                <HiStar className="active" />
              )}
            </div>
          </div>
          <div className="genre col">
            <h4>Genre</h4>
            <span className="genre-name">{genres?.[0]}</span>
          </div>
          <div className="released col">
            <h4>Released</h4>
            <span className="released-date">{released}</span>
          </div>
          <div className="directors col">
            <h4>Directors</h4>
            <span className="directors-name">
              <span>{directors?.[0]}</span>
              <span>{directors?.[1]}</span>
            </span>
          </div>
          <div className="language col">
            <h4>Language</h4>
            <span className="Languages">
              <span>{language}</span>
            </span>
          </div>
        </div>
        <Link
          to={`movieDetails/${imdbID}`}
          className="more-info"
          onClick={() => addRecentView(movie)}
        >
          More Info
        </Link>
      </div>
    </div>
  );
}

export default MovieDetails;
