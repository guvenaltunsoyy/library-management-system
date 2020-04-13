import React, { useEffect, useState } from "react";
import API from "../utils/api";
import InfoModal from "./InfoModal";

export default function MyTable(props) {
  const [arr, setArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
      (x) => x.assignedBookId == event.target.id
    )[0];
    var res = await API.post("give/book", {
      bookId: selectedBook._id,
      assignedBookId: event.target.id,
    });
    if (res && res.data.success) {
      setShowModal(true);
      arr.filter(
        (x) => x.assignedBookId == selectedBook.assignedBookId
      )[0].isReceipt = true;
    }
  }
  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <InfoModal
        show={showModal}
        title="Kitap geri verme başarılı"
        text="Aldığınız kitabı geri verdiğiniz için teşekkür ederiz"
        onHide={closeModal}
      />

      <table id="students">
        <tbody>
          <tr>
            <th key="1">KİTAP ADI</th>
            <th key="2">YAZAR ADI</th>
            <th key="3">ISBN NUMARASI</th>
            <th key="4">ALINAN TARİH</th>
            <th key="5">GEÇEN GÜN SAYISI</th>
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

                {!isReceipt && (
                  <td>
                    <button
                      id={assignedBookId}
                      onClick={(event) => GiveBook(event)}
                      className="btn-primary"
                    >
                      Kitabı Bırak
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
