import React from "react";
import "./App.css";
import Home from "./pages/Home";
import UserPage from "./pages/User";
import AddBook from "./pages/AddBook";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";

// <Route exact path="/rooms/:slug" component={SingleRoom} />
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add/book" component={AddBook} />
      </Switch>
    </>
  );
}

export default App;
