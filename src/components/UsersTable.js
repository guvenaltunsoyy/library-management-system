import React, {useEffect, useState} from "react";
import API from "../utils/api";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!showModal) {
            GetUsers();
            setShowModal(true);
        }
    }, [showModal]);

    async function GetUsers() {
        var res = await API.get("getUsers");
        if (res && res.data.success) {
            setUsers(res.data.users)
        }
    }

    return (
        <>
            <table id="students">
                <tbody>
                <tr>
                    <th key="1">ADI SOYADI</th>
                    <th key="2">MAIL ADRESI</th>
                    <th key="3">OKUL NUMARASI</th>
                    <th key="4">TELEFON NUMARASI</th>
                    <th key="5">UYELIK TIPI</th>
                </tr>
                {users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{`${user.name} ${user.surname}`}</td>
                            <td>{user.mail}</td>
                            <td>{user.schoolNumber}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.isManager ? "YONETICI" : "Kullanici"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}
