import React, {useEffect, useState} from "react";
import API from "../utils/api";

export default function MyTable() {
    const [arr, setArr] = useState([]);
    const [myDate, setMyDate] = useState();
    useEffect(() => {
        setMyDate(new Date(localStorage.getItem("date")) ?? new Date());

        async function GetBooks() {
            var result = await API.get("getBooksAsManager");
            setArr(result.data.usersWithBooks);
        }

        GetBooks();
    }, []);

    function getTwoDateDiff(date1, date2) {
        const difftime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(difftime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    //eslint-disable-next-line


    return (
        <div className="services">
            <div className="services-center">
                <table id="students">
                    <tbody>
                    <tr>
                        <th key="1232131">KİTAP ADI</th>
                        <th key="2123213">YAZAR ADI</th>
                        <th key="1231233">KULLANICI ADI</th>
                        <th key="131233">GEÇEN GÜN SAYISI</th>
                    </tr>
                    {arr.map((row, index) => {
                        const {user, book, createdAt} = row;
                        return (
                            <tr key={index}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{`${user.name} ${user.surname}`}</td>
                                <td>{getTwoDateDiff(myDate, new Date(createdAt))}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
