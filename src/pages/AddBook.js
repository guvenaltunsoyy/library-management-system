import React, { useState } from "react";
import Banner from "../components/Banner";

export default function AddBook() {
  const [bookName, setBookName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [quantity, setQuantity] = useState(0);

  async function handleClick() {
    // call endpoint
    console.log(bookName, isbnNumber, authorName, quantity);
  }
  return (
    <>
      <Banner title="kitap ekle" subtitle="lütfen bilgileri tam doldurunuz.">
        <div
          style={{
            width: "50%",
            height: "auto",
            background: "transparent",
            textAlign: "start",
          }}
        >
          <label>Kitap adı giriniz :</label>
          <input
            onChange={(event) => setBookName(event.target.value)}
            type="text"
            className="size-input"
            placeholder="Kitap adı giriniz"
          />
          <p />
          <label>ISBN numarası giriniz :</label>
          <input
            type="text"
            onChange={(event) => setIsbnNumber(event.target.value)}
            className="size-input"
            placeholder="ISBN giriniz"
          />
          <p />
          <label>Yazar adı giriniz :</label>
          <input
            type="text"
            onChange={(event) => setAuthorName(event.target.value)}
            className="size-input"
            style={{ alignSelf: "right" }}
            placeholder="Yazar adı giriniz"
          />
          <p />

          <label>Adet giriniz :</label>
          <input
            type="numeric"
            className="size-input"
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="Adet giriniz"
          />
          <p />

          <button
            type="submit"
            className="btn-primary"
            onClick={handleClick}
            style={{ marginTop: 20, background: "gray" }}
          >
            Ekle
          </button>
        </div>
      </Banner>
    </>
  );
}
