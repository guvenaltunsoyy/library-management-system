import React, {Component} from "react";
import {FaAlignRight} from "react-icons/fa";
import DatePicker from "react-datepicker";
import {Link} from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";

export default class NavBar extends Component {
    state = {
        isOpen: false,
        user: "",
        isManager: false,
        date: Date
    };

    componentWillMount() {
        const _user = sessionStorage.getItem("user");
        this.setState({
            isOpen: this.state.isOpen,
            user: JSON.parse(_user),
        });
        let _date = new Date(localStorage.getItem("date"));
        //eslint-disable-next-line
        this.state.date = _date.toLocaleDateString("tr", "ddMMyyyy") ?? new Date().toLocaleDateString("tr", "ddMMyyyy");
    }

    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };
    logout = () => {
        sessionStorage.clear();
        window.location.assign("/login/user");
    };
    setDate = date => {
        this.setState({
            ...this.state,
            date: date.toLocaleDateString("tr", "dd/mm/yyyy"),
        })
        localStorage.setItem("date", date);
    }
    getDate = () => {
        return (
            <>
                <DatePicker
                    className="btn-secondary"
                    locale="tr"
                    placeholderText="Tarih seçin"
                    selectedDate={this.state.date}
                    onChange={this.setDate}
                />
            </>
        );
    };

    render() {
        return (
            <>
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
                                <FaAlignRight className="nav-icon"/>
                            </button>
                        </div>
                        <ul
                            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
                        >
                            {this.state.user?.isManager ? (
                                <>
                                    <li>
                                        <Link to="/add/book">Kitap ekle </Link>
                                    </li>
                                    <li>
                                        <Link to="/getBooksAsManager">Kim Ne Almış </Link>
                                    </li>
                                    <li>
                                        <Link to="/users">Kullanıcılar </Link>
                                    </li>
                                </>
                            ) : (
                                <p/>
                            )}
                            {this.state.user && !this.state.user.isManager && (
                                <>
                                    <li>
                                        <Link to="/profile">Profilim</Link>
                                    </li>
                                </>
                            )}

                            {this.state.user ? (
                                <>
                                    <li style={{alignSelf: "center"}} className="room-info">
                                        {`Hoşgeldin ${this.state.user.name} ${this.state.user.surname}! ${this.state.date}`}
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
                            {this.state?.user?.isManager && <li style={{marginLeft: 10}}>
                                {this.getDate()}
                            </li>}
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}
