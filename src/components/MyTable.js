import React, {useEffect, useState} from "react";
import API from "../utils/api";
import InfoModal from "./InfoModal";
import axios from "axios";

export default function MyTable(props) {
    const [arr, setArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(1);

    useEffect(() => {
        setArr(props.books);
    }, [props]);

    function getTwoDateDiff(date1, date2) {
        const difftime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(difftime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    async function GiveBook(event) {
        let selectedBook = arr.filter(
            (x) => x.assignedBookId === event.target.id
        )[0];
        var res = await API.post("give/book", {
            bookId: selectedBook._id,
            assignedBookId: event.target.id,
        });
        if (res && res.data.success) {
            setShowModal(true);
            arr.filter(
                (x) => x.assignedBookId === selectedBook.assignedBookId
            )[0].isReceipt = true;
        }
    }

    function closeModal() {
        setShowModal(false);
    }

    function getIsbnNumberFromImage(event) {
        if (event.target?.files[0]) {
            for (var key in event.target?.files) {
                if (!event.target?.files.hasOwnProperty(key)) continue;
                let upload = event.target?.files[key];
                imageToBase64(URL.createObjectURL(upload)).then((dataUrl) => {
                    axios
                        .post("http://localhost:3001/api/getNumber", {
                            base64: dataUrl.split(",")[1],
                            rows: rows,
                            cols: cols,
                        })
                        .then(async (res) => {
                            if (res?.data?.isbnNumber) {
                                localStorage.setItem("isbnNumber", res?.data?.isbnNumber);
                                const event = {
                                    target: {
                                        id: arr.find((book) => {
                                            return book.isbnNumber === res.data.isbnNumber;
                                        }).assignedBookId
                                    }
                                }
                                await GiveBook(event)
                            } else {
                                alert("ISBN numarası okunamadı.");
                            }
                        });
                });
            }
        }
    }

    const imageToBase64 = (url) =>
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
            <InfoModal
                show={showModal}
                title="Kitap geri verme başarılı"
                text="Aldığınız kitabı geri verdiğiniz için teşekkür ederiz"
                onHide={closeModal}
            />
            <div>
                <input
                    style={{width: '100%'}}
                    type="text"
                    //eslint-disable-next-line
                    onChange={(event) => {
                        //eslint-disable-next-line
                        setRows(event.target.value);
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
                        setCols(event.target.value);
                    }}
                />
                <button
                    className="btn-secondary"
                    style={{marginTop: 10, width: '100%'}}
                    onClick={clickFileInput}
                >
                    Fotoğraf Seç
                </button>
            </div>
            <table id="students">
                <tbody>
                <tr>
                    <th key="1">KİTAP ADI</th>
                    <th key="2">YAZAR ADI</th>
                    <th key="3">ISBN NUMARASI</th>
                    <th key="4">ALINAN TARİH</th>
                    <th key="5">GEÇEN GÜN SAYISI</th>
                    <th key="6">KİTAP DURUMU</th>
                </tr>
                {arr.map((book, index) => {
                    const {
                        title,
                        author,
                        isbnNumber,
                        createdAt,
                        isReceipt,
                        assignedBookId,
                    } = book;
                    return (
                        <tr key={index}>
                            <td>{title}</td>
                            <td>{author}</td>
                            <td>{isbnNumber}</td>
                            <td>
                                {new Date(createdAt).toLocaleDateString("tr", "dd/mm/yyyy")}
                            </td>
                            <td>{getTwoDateDiff(new Date(), new Date(createdAt))}</td>
                            <td>
                                {!isReceipt ?
                                    <button
                                        id={assignedBookId}
                                        onClick={(event) => GiveBook(event)}
                                        className="btn-primary"
                                    >
                                        Kitabı Bırak
                                    </button> : <p>Kitap iade edilmiş</p>
                                }
                            </td>

                        </tr>
                    );
                })}
                </tbody>
            </table>
            <input
                type="file"
                style={{visibility: "hidden", width: '0%'}}
                id="fileUploader"
                placeholder="Fotoğraf seç"
                onChange={getIsbnNumberFromImage}
            />
        </>
    );
}
