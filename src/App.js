import React from "react";
import "./App.css";
import Home from "./pages/Home";
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
        <Route exact path="/borrow/book/:_id" component={Home} />
      </Switch>
    </>
  );
}

export default App;
