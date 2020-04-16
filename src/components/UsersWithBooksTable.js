import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function MyTable() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    GetBooks();
  }, [GetBooks]);
  function getTwoDateDiff(date1, date2) {
    const difftime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(difftime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  async function GetBooks() {
    var result = await API.get("getBooksAsManager");
    console.log(result?.data);
    setArr(result.data.usersWithBooks);
  }

  return (
    <div className="services">
      <div className="services-center">
        <table id="students">
          <tbody>
            <tr>
              <th key="1">KİTAP ADI</th>
              <th key="2">YAZAR ADI</th>
              <th key="3">KULLANICI ADI</th>
              <th key="3">GEÇEN GÜN SAYISI</th>
            </tr>
            {arr.map((row, index) => {
              const { user, book, createdAt } = row;
              return (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{`${user.name} ${user.surname}`}</td>
                  <td>{getTwoDateDiff(new Date(), new Date(createdAt))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
