import MovieSearchForm from "../components/MovieSearchForm";
import RecentlyViewed from "../components/RecentlyViewed";
import AllMovies from "../components/AllMovies";
import Logo from "./Logo";
import Search from "./Search";

function AppLayout() {
  return (
    <>
      <MovieSearchForm>
        <Logo />
        <Search />
      </MovieSearchForm>
      <main>
        <RecentlyViewed />
        <AllMovies />
      </main>
    </>
  );
}

export default AppLayout;
