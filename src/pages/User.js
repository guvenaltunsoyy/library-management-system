import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import API from "../utils/api";

export default function User() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    var result = await API.post("login", {
      mail: username,
      password: password,
    });
    console.log(result);

    if (result.data.user) {
      //alert("Hoşgeldiniz!");
      sessionStorage.setItem("user", JSON.stringify(result.data.user));
      window.location.assign("/");
    } else {
      alert("Kullanıcı adı ya da şifre hatalı!");
    }
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
