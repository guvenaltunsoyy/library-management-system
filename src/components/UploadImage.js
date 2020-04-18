import React, { Component } from "react";
import axios from "axios";
import API from "../utils/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      patterns: [],
      documents: [],
    };
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        this.toDataURL(URL.createObjectURL(upload)).then((dataUrl) => {
          axios
            .post("http://localhost:3001/api/getNumber", {
              base64: dataUrl.split(",")[1],
              rows: 3,
              cols: 1,
            })
            .then((res) => {
              if (res?.data?.isbnNumber) {
                localStorage.setItem("isbnNumber", res?.data?.isbnNumber);
                this.refs.inputBookName.value = res?.data?.isbnNumber;
              } else {
                alert("ISBN numarası okunamadı.");
              }
            });
        });
      }

      this.setState({
        uploads: uploads,
      });
    } else {
      this.setState({
        uploads: [],
      });
    }
  };
  toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>ISBN Okuma</h1>
        </header>
        <section className="hero">
          <label className="fileUploaderContainer">
            Fotoğrafı seçmek için tıklayın
            <input
              type="file"
              id="fileUploader"
              onChange={this.handleChange}
              multiple
            />
          </label>

          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} width="100px" />;
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
