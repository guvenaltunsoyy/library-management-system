import React, { useEffect, useState } from "react";

export default function MyTable(props) {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    setArr(props.books);
  }, [props]);
  function getTwoDateDiff(date1, date2) {
    const difftime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(difftime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return (
    <table id="students">
      <tbody>
        <tr>
          <th key="1">KİTAP ADI</th>
          <th key="2">YAZAR ADI</th>
          <th key="3">ISBN NUMARASI</th>
          <th key="4">GEÇEN GÜN SAYISI</th>
        </tr>
        {arr.map((book, index) => {
          const { _id, title, author, isbnNumber, createdAt } = book;
          return (
            <tr key={index}>
              <td>{title}</td>
              <td>{author}</td>
              <td>{isbnNumber}</td>
              <td>{getTwoDateDiff(new Date(), new Date(createdAt))}</td>
              <td>
                <button id={_id} className="btn-primary">
                  Kitabı Bırak
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
