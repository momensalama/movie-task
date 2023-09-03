import { useRef } from "react";
import {
  HiChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { contextValues, useMovies } from "../context/useMovie";
import RecentMovie from "../ui/RecentMovie";

function RecentlyViewed() {
  const { handleClick, open, viewedMovie } = useMovies() as contextValues;

  const sliderRef = useRef<HTMLDivElement>(null);

  const prev = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft -= width;
    }
  };
  const next = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft += width;
    }
  };

  return (
    <section className="recent-view__section">
      <button className="recent-view__btn" onClick={handleClick}>
        <h2>Recently Viewd shows</h2>
        <HiChevronDown />
      </button>
      {open && (
        <div className="slider">
          <button className="slide-arrow prev" onClick={prev}>
            <HiOutlineChevronLeft />
          </button>
          <div className="slider-container" ref={sliderRef}>
            {viewedMovie.map((movie) =>
              !movie.Poster ? (
                ""
              ) : (
                <RecentMovie key={movie.imdbID} movie={movie} />
              )
            )}
          </div>
          <button className="slide-arrow next" onClick={next}>
            <HiOutlineChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}

export default RecentlyViewed;
