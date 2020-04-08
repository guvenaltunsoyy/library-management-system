import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";

export default function User() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
    // call service
    console.log(username, password);
  }

  return (
    <div>
      <Banner title="Giriş" subtitle="Lütfen kullanıcı bilgilerini giriniz.">
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          className="size-input"
          placeholder="Kullanıcı adı giriniz"
        />
        <br />
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          className="size-input"
          placeholder="Şifrenizi giriniz"
        />
        <p />
        <button onClick={login} className="btn-primary">
          Giriş Yap
        </button>
      </Banner>
    </div>
  );
}
