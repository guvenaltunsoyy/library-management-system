import React from "react";
import "./App.css";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import NavBar from "./components/NavBar";
import {Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Manager from "./pages/Manager";
import Users from "./pages/Users";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/add/book" component={AddBook}/>
                <Route exact path="/assign/book/" component={Home}/>
                <Route exact path="/login/user" component={Login}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/getBooksAsManager" component={Manager}/>
                <Route exact path="/users" component={Users}/>
            </Switch>
        </>
    );
}

export default App;
