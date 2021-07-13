import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import authService from "../auth/authService";
import Like from "./common/Like";
import Table from "./common/Table";

function MoviesTable({ movies, onDelete, onLike, onSort, sortColumn }) {
  const user = authService.getCurrentUser();
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        if (!user) return movie.title;
        return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like isLiked={movie.isLiked} onLike={() => onLike(movie)} />
      ),
    },
  ];

  useMemo(() => {
    if (user && user.isAdmin) {
      columns.push({
        key: "delete",
        content: (movie) => (
          <button onClick={() => onDelete(movie)} className="btn btn-danger">
            Delete
          </button>
        ),
      });
    }
  });

  return (
    <Table
      data={movies}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default MoviesTable;
