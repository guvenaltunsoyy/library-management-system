import React, { Component } from "react";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  state = {
    isOpen: false,
    user: "",
    isManager: false,
  };
  componentWillMount() {
    const _user = sessionStorage.getItem("user");
    this.setState({
      isOpen: this.state.isOpen,
      user: JSON.parse(_user),
    });
  }
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  logout = () => {
    sessionStorage.clear();
    window.location.assign("/login/user");
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
            {this.state.user?.isManager ? (
              <li>
                <Link to="/add/book">Kitap ekle </Link>
              </li>
            ) : (
              <p></p>
            )}
            {this.state.user && !this.state.user.isManager && (
              <li>
                <Link to="/profile">Profilim</Link>
              </li>
            )}

            {this.state.user ? (
              <>
                <li style={{ alignSelf: "center" }} className="room-info">
                  {`Hoşgeldin ${this.state.user.name} ${this.state.user.surname}!`}
                </li>
                <li>
                  <button
                    className="btn-primary"
                    onClick={this.logout}
                    style={{
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  >
                    Çıkış Yap
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login/user">Kullanıcı girişi</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
