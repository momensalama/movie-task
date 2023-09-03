import { useNavigate } from "react-router-dom";
import { contextValues, useMovies } from "../context/useMovie";
import Review from "../ui/Review";

function MovieDetailsPage() {
  const navigate = useNavigate();
  const { movie, reviews } = useMovies() as contextValues;
  const {
    Title: title,
    Language: language,
    Poster: poster,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
    Runtime: duration,
    Writer,
    Actors,
  } = movie;
  const genres = genre?.split(",");

  return (
    <>
      <button className="btn-back" onClick={() => navigate("/")}>
        &larr;
      </button>
      <section className="movie-details__page">
        <div className="movie-content">
          <figure>
            <img src={poster} alt="film" />
          </figure>
          <div className="movie-details">
            <h1>{title}</h1>
            <ul className="genres">
              {genres?.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
            <h2>Overview</h2>
            <p>{plot}</p>
            <div className="dates">
              <div className="rate">
                <h3>Rating</h3>
                <span>⭐ {imdbRating}</span>
              </div>
              <div className="release">
                <h3>Release</h3>
                <span>📅 {released}</span>
              </div>
              <div className="runtime">
                <h3>Runtime</h3>
                <span>⌛ {duration}</span>
              </div>
            </div>
            <div className="people">
              <strong>actors 🎭</strong>: {Actors}
            </div>
            <div className="people">
              <strong>directors</strong>: {director}
            </div>
            <div className="people">
              <strong>Writer</strong>: {Writer}
            </div>
            <div className="people">
              <strong>Language </strong>: {language}
            </div>
          </div>
        </div>
      </section>
      <section className="movie-review">
        <h4>Reviews</h4>
        <ul className="reviews">
          {reviews.map((review, index: number) => (
            <Review review={review} key={review._id} index={index} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default MovieDetailsPage;
