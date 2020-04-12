import React, { Component } from "react";
import axios from "axios";
import Title from "./Title";
import Banner from "./Banner";
import InfoModal from "./InfoModal";
import API from "../utils/api";

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
      showInfoModal: false,
      loginRequired: true,
      modal: {
        title: "",
        subtitle: "",
        text: "",
      },
    };
    this.getBooks();
  }
  componentDidUpdate() {
    //console.log(this.state);
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

  assignBook = async (event) => {
    var userId = JSON.parse(sessionStorage.getItem("user"))?._id;
    if (userId === undefined || userId === null) {
      this.state.modal.text = "Kitap alabilmek için giriş yapmanız gerekmekte.";
      this.state.modal.title = "Giriş Yapın";
    } else {
      var result = await API.post("assign/book", {
        userId: userId,
        bookId: event.target.id,
        date: new Date(),
      });
      if (result.data.result) {
        this.state.modal.title = "Kitap Alımı Başarılı";
        this.state.modal.text = result.data.message;
      } else {
        this.state.modal.title = "Kitap Alımı Başarısız";
        this.state.modal.text = result.data.message;
      }
    }
    this.showInfoModal();
  };

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
  showInfoModal = () => {
    var toggle = this.state.showInfoModal;
    this.setState({ ...this.state, showInfoModal: !toggle });
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
            <button id={_id} onClick={this.assignBook} className="btn-primary">
              Kitap Al
            </button>
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
        <InfoModal
          show={this.state.showInfoModal}
          onHide={this.showInfoModal}
          title={this.state.modal.title}
          subtitle={this.state.modal.subTitle}
          text={this.state.modal.text}
        />
        <section className="services">
          <Title title="Kitaplar" />
          <div className="services-center">
            <table id="students">
              <tbody>
                <tr>
                  <th key="1">KİTAP ADI</th>
                  <th key="2">YAZAR ADI</th>
                  <th key="3">ADET</th>
                  <th key="4">ISBN NUMARASI</th>
                </tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
}
