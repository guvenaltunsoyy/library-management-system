import React, { Component } from "react";
import axios from "axios";
import Title from "./Title";
import { Link } from "react-router-dom";
import Banner from "./Banner";

const _url = "http://lib-mng-server.herokuapp.com/api/getBooks";

export default class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          _id: "",
          isbnNumber: "",
          title: "",
          author: "",
          quantity: 0,
          createdAt: "",
          updatedAt: "",
        },
      ],
      tempBooks: [],
      searchBookName: "",
      searchIsbnNumber: "",
    };
    this.getBooks();
  }

  async getBooks() {
    var res = await axios.get(_url);
    if (res && res.data.success) {
      this.setState({
        ...this.state,
        books: res.data.books,
        tempBooks: res.data.books,
      });
    }
  }
  searchWithBookName = (event) => {
    this.setState({
      ...this.state,
      books: this.state.tempBooks.filter((book) =>
        book.title.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    });
  };
  searchWithIsbnNumber = (event) => {
    this.setState({
      ...this.state,
      books: this.state.tempBooks.filter((book) =>
        book.isbnNumber.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    });
  };

  cleanTable = () => {
    this.refs.inputBookName.value = "";
    this.refs.inputIsbn.value = "";
    this.setState({
      ...this.state,
      books: this.state.tempBooks,
    });
  };
  renderTableHeader = () => {
    if (this.state.books[0] === undefined) return;
    let header = Object.keys(this.state.books[0]);
    header = header.slice(1, header.length - 3);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  renderTableData = () => {
    return this.state.books.map((book, index) => {
      const { _id, title, author, quantity, isbnNumber } = book;
      return (
        <tr key={_id}>
          <td>{title}</td>
          <td>{author}</td>
          <td>{quantity}</td>
          <td>{isbnNumber}</td>
          <td>
            <Link to={`/borrow/book/${_id}`} className="btn-primary">
              Kitap Al
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Banner
          title="Hoşgeldiniz"
          subtitle="aramak istediğiniz kitap adını ya da ISBN numarasını giriniz"
        >
          <input
            type="text"
            onChange={(event) => {
              this.searchWithBookName(event);
            }}
            className="size-input"
            ref="inputBookName"
            placeholder="Kitap adı giriniz"
          />
          <input
            type="text"
            className="size-input"
            ref="inputIsbn"
            placeholder="Isbn numarası giriniz"
            onChange={(event) => {
              this.searchWithIsbnNumber(event);
            }}
          />
          <button onClick={this.cleanTable} className="btn-primary">
            Temizle
          </button>
        </Banner>
        <section className="services">
          <Title title="Kitaplar" />
          <div className="services-center">
            <table id="students">
              <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
}
