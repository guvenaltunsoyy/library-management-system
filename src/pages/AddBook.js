import React, { useState } from "react";
import Banner from "../components/Banner";
import API from "../utils/api";
import InfoModal from "../components/InfoModal";

export default function AddBook() {
  const [bookName, setBookName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
  return (
    <>
      <InfoModal
        show={showModal}
        title="Kitap ekleme başarılı"
        text={`${quantity} adet "${bookName}" kütüphaneye eklendi.`}
        onHide={closeModal}
      />
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
              onChange={(event) => setIsbnNumber(event.target.value)}
              className="size-input"
              placeholder="ISBN giriniz"
            />
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
              style={{ alignSelf: "right" }}
              placeholder="Yazar adı giriniz"
            />
          </div>
        </div>
        <p />

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
          <button
            type="submit"
            className="btn-primary"
            onClick={handleClick}
            style={{ marginTop: 40, background: "gray" }}
          >
            Ekle
          </button>
        </div>
      </div>
    </>
  );
}
