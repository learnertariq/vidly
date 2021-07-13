import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Customers from "./components/Customers";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import MovieForm from "./components/MovieForm";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import Rentals from "./components/Rentals";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import authService from "./auth/authService";

function App(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route path="/register" component={RegisterForm} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
