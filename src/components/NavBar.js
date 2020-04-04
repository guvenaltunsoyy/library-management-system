import React, { Component } from "react";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/" className="btn-primary">
              Anasayfa
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/login/user">Kullanıcı girişi</Link>
            </li>
            <li>
              <Link to="/login/manager">Yönetici girişi</Link>
            </li>
            <li>
              <Link to="/add/book">Kitap ekle</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
