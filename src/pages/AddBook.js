import React, {useState} from "react";
import API from "../utils/api";
import InfoModal from "../components/InfoModal";
import axios from "axios";

export default function AddBook() {
    const [bookName, setBookName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(1);

    async function handleClick() {
        // call endpoint
        var res = await API.post("addBook", {
            title: bookName,
            author: authorName,
            quantity,
            isbnNumber,
        });
        if (res && res.data.success) {
            setShowModal(true);
        }
    }

    function closeModal() {
        setShowModal(false);
    }

    function getIsbnNumberFromImage(event) {
        if (event.target.files[0]) {
            for (var key in event.target.files) {
                if (!event.target.files.hasOwnProperty(key)) continue;
                let upload = event.target.files[key];
                toDataURL(URL.createObjectURL(upload)).then((dataUrl) => {
                    axios
                        .post("http://localhost:3001/api/getNumber", {
                            base64: dataUrl.split(",")[1],
                            rows: rows,
                            cols: cols,
                        })
                        .then((res) => {
                            if (res?.data?.isbnNumber) {
                                setIsbnNumber(res?.data?.isbnNumber);
                            } else {
                                alert("ISBN numarası okunamadı.");
                            }
                        })
                        .catch((error) => alert(error));
                });
            }
        }
    }

    const toDataURL = (url) =>
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

    function clickFileInput() {
        document.getElementById("fileUploader").click();
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-25">
                        <label>Kitap adı giriniz :</label>
                    </div>
                    <div className="col-75">
                        <input
                            onChange={(event) => setBookName(event.target.value)}
                            type="text"
                            className="size-input"
                            placeholder="Kitap adı giriniz"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>ISBN numarası giriniz :</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            value={isbnNumber}
                            onChange={(event) => setIsbnNumber(event.target.value)}
                            className="size-input"
                            placeholder="ISBN giriniz"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Fotoğraf kaç satıra bölünecek :</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            onChange={(event) => {
                                setRows(event.target.value);
                            }}
                            className="size-input"
                            placeholder="Satır, Örnek -> 3"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Fotoğraf kaç sütuna bölünecek :</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            className="size-input"
                            id="isbnNumber"
                            placeholder="Sütun, Örnek -> 1"
                            onChange={(event) => {
                                setCols(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <input
                            type="file"
                            style={{visibility: "hidden"}}
                            id="fileUploader"
                            placeholder="Fotoğraf seç"
                            onChange={getIsbnNumberFromImage}
                        />
                    </div>
                    <div className="col-75">
                        <button
                            className="btn-primary"
                            style={{margin: 10}}
                            onClick={clickFileInput}
                        >
                            Fotoğraf Seç
                        </button>
                    </div>

                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Yazar adı giriniz :</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            onChange={(event) => setAuthorName(event.target.value)}
                            className="size-input"
                            style={{alignSelf: "right"}}
                            placeholder="Yazar adı giriniz"
                        />
                    </div>
                </div>
                <p/>

                <div className="row">
                    <div className="col-25">
                        {" "}
                        <label>Adet giriniz :</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="numeric"
                            className="size-input"
                            onChange={(event) => setQuantity(event.target.value)}
                            placeholder="Adet giriniz"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">

                    </div>
                    <div className="col-75">
                        <button
                            type="submit"
                            className="btn-primary"
                            onClick={handleClick}
                            style={{marginTop: 40, background: "gray"}}
                        >
                            Ekle
                        </button>
                    </div>
                </div>
            </div>
            <InfoModal
                show={showModal}
                title="Kitap ekleme başarılı"
                text={`${quantity} adet "${bookName}" kütüphaneye eklendi.`}
                onHide={closeModal}
            />
        </>
    );
}
