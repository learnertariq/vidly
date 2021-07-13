import React from "react";
import Joi from "joi";
import { toast } from "react-toastify";

import Form from "./common/Form";
import genresApi from "../services/genresApi";
import moviesApi from "../services/moviesApi";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schemaObj = {
    _id: Joi.string(),
    title: Joi.string().min(5).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(1).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };
  schema = Joi.object().keys(this.schemaObj);

  doSubmit = async () => {
    const { history } = this.props;
    try {
      const { data: movie } = this.state;
      const { headers } = await moviesApi.saveMovie(movie);
      console.log(headers);
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 401 || ex.response.status === 400)
      ) {
        toast.error("You need to log in");
        return history.push("/login");
      }
    }
    history.push("/movies");
  };

  async populateGenres() {
    const { data: genres } = await genresApi.getGenres();
    this.setState({ genres });
  }

  populateMovies = async () => {
    try {
      const { id } = this.props.match.params;
      if (id === "new") return;

      const { data: movie } = await moviesApi.getMovie(id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  componentDidMount = async () => {
    this.populateGenres();
    this.populateMovies();
  };

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  render() {
    const genres = this.state.genres;
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
