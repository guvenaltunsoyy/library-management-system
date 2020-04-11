import React from "react";
import "./App.css";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import User from "./pages/User";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add/book" component={AddBook} />
        <Route exact path="/assign/book/" component={Home} />
        <Route exact path="/login/user" component={User} />
      </Switch>
    </>
  );
}

export default App;
