import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { BASE_URL, REVIEW_URL } from "../constant/url";

export type viewedMovieTypes = {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster?: string;
  Production?: string;
  Rated?: string;
  Ratings?: {
    Source: string;
    Value: string;
  };
  Released?: string;
  Response?: string;
  Runtime?: string;
  Title?: string;
  Type?: string;
  Website?: string;
  Writer?: string;
  Year?: string;
  imdbID?: string;
  imdbRating?: string | undefined;
  imdbVotes?: string;
};

interface article {
  abstract: string;
  byline: {
    person: {
      firstname: string;
      lastname: string;
      middlename: string | null;
      organization: string;
      qualifier: null;
      rank: number;
      role: string;
      title: null;
    }[];
  };
  document_type: string;
  headline: {
    main: string;
    kicker: null;
    content_kicker: null;
    print_headline: string;
    name: null;
  };
  keywords: {
    major: string;
    name: string;
    rank: number;
    value: string;
  }[];
  lead_paragraph: string;
  multimedia: any[];
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}

export interface contextValues {
  isOpend: boolean;
  movie: viewedMovieTypes;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSelectMovie(id: string | undefined): void;
  handleClick: () => void;
  open: boolean;
  viewedMovie: viewedMovieTypes[];
  isLoading: boolean;
  handleButtonClick(button: string): void;
  movies: viewedMovieTypes[];
  activeButton: string;
  addRecentView(data: viewedMovieTypes): void;
  reviews: article[];
}

interface MyComponentProps {
  children: ReactNode;
}

const MoviesContext = createContext<contextValues | {}>({});

function MoviesProvider({ children }: MyComponentProps) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [viewedMovie, setViewedMovie] = useState<viewedMovieTypes[]>([]);
  const [movie, setMovie] = useState({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string>("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleClick(): void {
    setOpen((open) => !open);
  }

  async function getReviews(name: string | undefined) {
    const res = await fetch(
      `${REVIEW_URL}&api-key=${import.meta.env.VITE_REVIEW_API_KEY}&q='${name}'`
    );
    const data = await res.json();
    setReviews(data.response.docs);
  }

  function addRecentView(data: viewedMovieTypes) {
    const isMovieViewed = viewedMovie.some(
      (movie) => movie.imdbID === data.imdbID
    );
    if (!isMovieViewed) {
      setViewedMovie((viewedMovie) => [...viewedMovie, data]);
      getReviews(data?.Title);
    }
  }

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(
        `${BASE_URL}${import.meta.env.VITE_API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    }

    if (selectedId !== null) {
      getMovieDetails();
    }
  }, [selectedId, viewedMovie]);

  useEffect(
    function () {
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `${BASE_URL}${
            import.meta.env.VITE_API_KEY
          }&s=${query}&type=${activeButton}
        `
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        if (data.Response === "False") throw new Error("Movie Not Found");
        setMovies(data.Search);
        setIsLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      fetchMovies();
    },
    [query, activeButton]
  );
  return (
    <MoviesContext.Provider
      value={{
        movies,
        query,
        setQuery,
        handleSelectMovie,
        movie,
        handleClick,
        open,
        viewedMovie,
        activeButton,
        handleButtonClick,
        isLoading,
        addRecentView,
        reviews,
        getReviews,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("MoviesContext was used outside the provider");
  return context;
}

export { MoviesProvider, useMovies };
