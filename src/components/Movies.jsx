import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import moviesApi from "../services/moviesApi";
import genresApi from "../services/genresApi";
import { toast } from "react-toastify";

function Movies({ user }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchString, setSearchString] = useState("");
  const pageSize = 4;

  useEffect(() => {
    const fetchData = async () => {
      const { data: newMovies } = await moviesApi.getMovies();
      setMovies(newMovies);

      const { data: genres } = await genresApi.getGenres();
      setGenres([{ key: "allGenres", name: "All Genres" }, ...genres]);
    };
    fetchData();
  }, []);

  const handleDelete = async (movie) => {
    const originalMovies = [...movies];
    setMovies(originalMovies.filter((m) => m._id !== movie._id));

    try {
      await moviesApi.deleteMovie(movie);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted");

      setMovies(originalMovies);
    }
  };

  const handleLike = (movie) => {
    const prevMovies = [...movies];
    const index = prevMovies.indexOf(movie);
    prevMovies[index].isLiked = !prevMovies[index].isLiked;
    setMovies(prevMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = ({ target }) => {
    setSearchString(target.value);
    setCurrentPage(1);
    setSelectedGenre("");
  };

  const getPageData = () => {
    const searchFiltered = searchString
      ? movies.filter((m) =>
          m.title.toLowerCase().startsWith(searchString.toLowerCase())
        )
      : movies;

    const genreFiltered = selectedGenre._id
      ? searchFiltered.filter((movie) => movie.genre._id === selectedGenre._id)
      : searchFiltered;

    const sorted = _.orderBy(
      genreFiltered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const paginated = paginate(sorted, currentPage, pageSize);
    return {
      items: paginated,
      count: genreFiltered.length,
    };
  };

  if (movies.length === 0) {
    return (
      <div>
        <p>There is no movies in the database</p>
        <Link to="/movies/new">
          <button className="btn btn-primary btn-lg m-2">New Movie</button>
        </Link>
      </div>
    );
  }
  const { count, items: finalMovies } = getPageData();
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
        />
      </div>

      <div className="col-9">
        <p>Showing {count} movies in the database</p>

        {user && (
          <Link to="/movies/new" className="btn btn-primary btn-lg m-2">
            New Movie
          </Link>
        )}

        <input
          className="form-control"
          onChange={handleSearch}
          placeholder="Search...."
          style={{ marginBottom: 20 }}
        />

        <MoviesTable
          movies={finalMovies}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
          sortColumn={sortColumn}
        />

        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
