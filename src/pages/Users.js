import React from "react";
import UsersTable from "../components/UsersTable";
import Banner from "../components/Banner";

export default function Users() {
    return (
        <>
            <Banner title="Hosgeldiniz" subtitle="Asağıda kayıtlı kullanıcılar listelenmektedir"/>
            <UsersTable/>
        </>
    )
        ;
}
