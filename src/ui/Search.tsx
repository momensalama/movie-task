import { FormEvent } from "react";
import { HiSearch } from "react-icons/hi";
import { contextValues, useMovies } from "../context/useMovie";

function Search() {
  const { query, setQuery }: contextValues = useMovies() as contextValues;
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <HiSearch />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
    </form>
  );
}

export default Search;
