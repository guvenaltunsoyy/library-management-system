import React from "react";
import UsersWithBooks from "../components/UsersWithBooksTable";
import Banner from "../components/Banner";
export default function Manager() {
  return (
    <>
      <Banner
        title="Hoşgeldiniz"
        subtitle="Aşağıda kim hangi kitabı almış onu görüntülüyorsunuz."
      />
      <UsersWithBooks />
    </>
  );
}
