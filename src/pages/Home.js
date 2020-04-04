import React, { useState } from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import BookSearch from "../components/BookSearch";

export default function Home() {
  const [bookname, setBookname] = useState("");
  const [isbnNumber, setIsbnNumber] = useState(0);
  return (
    <>
      <Banner
        title="Hoşgeldiniz"
        subtitle="aramak istediğiniz kitap adını ya da ISBN numarasını giriniz"
      >
        <input
          type="value"
          className="size-input"
          placeholder="kitap adı giriniz"
        />
        <input
          type="value"
          className="size-input"
          placeholder="isbn numarası giriniz"
        />
        <Link to="/" className="btn-primary">
          Ara
        </Link>
      </Banner>
    </>
  );
}
