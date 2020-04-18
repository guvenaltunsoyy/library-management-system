import React, {Component} from "react";
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
            rows: 3,
            cols: 1,
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

    assignBook = async (event) => {
        var userId = JSON.parse(sessionStorage.getItem("user"))?._id;
        let _date = localStorage.getItem("date");
        if (userId === undefined || userId === null) {
            this.state.modal.text = "Kitap alabilmek için giriş yapmanız gerekmekte.";
            this.state.modal.title = "Giriş Yapın";
        } else {
            var result = await API.post("assign/book", {
                userId: userId,
                bookId: event.target.id,
                date: _date ?? new Date(),
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
        await this.getBooks();
    };
    getIsbnNumberFromImage = (event) => {
        if (event.target.files[0]) {
            for (var key in event.target.files) {
                if (!event.target.files.hasOwnProperty(key)) continue;
                let upload = event.target.files[key];
                this.toDataURL(URL.createObjectURL(upload)).then((dataUrl) => {
                    axios
                        .post("http://localhost:3001/api/getNumber", {
                            base64: dataUrl.split(",")[1],
                            rows: this.state.rows,
                            cols: this.state.cols,
                        })
                        .then((res) => {
                            if (res?.data?.isbnNumber) {
                                localStorage.setItem("isbnNumber", res?.data?.isbnNumber);
                                this.refs.inputIsbn.value = res?.data?.isbnNumber;
                                this.searchWithIsbnNumber(res.data.isbnNumber);
                            } else {
                                alert("ISBN numarası okunamadı.");
                            }
                        });
                });
            }
        }
    };
    toDataURL = (url) =>
        fetch(url)
            .then((response) => response.blob())
            .then(
                (blob) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    })
            );
    searchWithBookName = (event) => {
        this.setState({
            ...this.state,
            books: this.state.tempBooks.filter((book) =>
                book.title.toLowerCase().includes(event.target.value.toLowerCase())
            ),
        });
    };
    searchWithIsbnNumber = (isbn) => {
        this.setState({
            ...this.state,
            books: this.state.tempBooks.filter((book) =>
                book.isbnNumber.toLowerCase().includes(isbn.toLowerCase())
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
    //renderTableHeader = () => {
    //    if (this.state.books[0] === undefined) return;
    //    let header = Object.keys(this.state.books[0]);
    //    header = header.slice(1, header.length - 3);
    //    return header.map((key, index) => {
    //        return <th key={index}>{key.toUpperCase()}</th>;
    //    });
    //};
    showInfoModal = () => {
        var toggle = this.state.showInfoModal;
        this.setState({...this.state, showInfoModal: !toggle});
    };
    clickFileInput = () => {
        document.getElementById("fileUploader").click();
    };
    renderTableData = () => {
        return this.state.books.map((book, index) => {
            const {_id, title, author, quantity, isbnNumber} = book;
            return (
                <tr key={_id}>
                    <td>{title}</td>
                    <td>{author}</td>
                    <td>{quantity}</td>
                    <td>{isbnNumber}</td>
                    <td>
                        {quantity > 0 ? <button id={_id} onClick={this.assignBook} className="btn-primary">
                            Kitap Al
                        </button> : <p>Stok yetersiz</p>}
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
                />
                <InfoModal
                    show={this.state.showInfoModal}
                    onHide={this.showInfoModal}
                    title={this.state.modal.title}
                    subtitle={this.state.modal.subTitle}
                    text={this.state.modal.text}
                />
                <section className="services">
                    <Title title="Kitaplar"/>
                    <div className="services-center">
                        <input
                            type="text"
                            onChange={(event) => {
                                this.searchWithBookName(event);
                            }}
                            style={{width: '100%'}}
                            className="size-input"
                            ref="inputBookName"
                            placeholder="Kitap adı giriniz"
                        />
                        <input
                            type="text"
                            className="size-input"
                            ref="inputIsbn"
                            style={{width: '100%'}}
                            id="isbnNumber"
                            placeholder="Isbn numarası giriniz"
                            onChange={(event) => {
                                this.searchWithIsbnNumber(event.target.value);
                            }}
                        />
                        <button
                            onClick={this.cleanTable}
                            className="btn-primary"
                            style={{marginTop: 10, width: '100%'}}
                        >
                            Temizle
                        </button>
                    </div>
                    <div className="services-center">
                        <input
                            style={{width: '100%'}}
                            type="text"
                            //eslint-disable-next-line
                            onChange={(event) => {
                                //eslint-disable-next-line
                                this.state.rows = event.target.value;
                            }}
                            className="size-input"
                            placeholder="Satır, Örnek -> 3"
                        />
                        <input
                            style={{width: '100%'}}
                            type="text"
                            className="size-input"
                            id="isbnNumber"
                            placeholder="Sütun, Örnek -> 1"
                            onChange={(event) => {
                                //eslint-disable-next-line
                                this.state.cols = event.target.value;
                            }}
                        />
                        <button
                            className="btn-secondary"
                            style={{marginTop: 10, width: '100%'}}
                            onClick={this.clickFileInput}
                        >
                            Fotoğraf Seç
                        </button>
                    </div>
                    <div className="services-center"
                         style={{marginTop: 20}}>
                        {this.state.books.length === 0 ? (
                            "Kitap bulunamadı"
                        ) : (
                            <table id="students">
                                <tbody>
                                <tr>
                                    <th key="1">KİTAP ADI</th>
                                    <th key="2">YAZAR ADI</th>
                                    <th key="3">ADET</th>
                                    <th key="4">ISBN NUMARASI</th>
                                    <th key="5">KİTAP AL</th>
                                </tr>
                                {this.renderTableData()}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
                <input
                    type="file"
                    style={{visibility: "hidden", width: '0%'}}
                    id="fileUploader"
                    placeholder="Fotoğraf seç"
                    onChange={this.getIsbnNumberFromImage}
                />
            </>
        );
    }
}
