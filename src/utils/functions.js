import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
//eslint-disable-next-line

export default class Functions {

    async getIsbnNumberFromImage(event) {
        if (event?.target.files[0]) {
            for (var key in event?.target.files) {
                if (!event?.target.files.hasOwnProperty(key)) continue;
                let upload = event?.target.files[key];
                this.imageToBase64(URL.createObjectURL(upload)).then((dataUrl) => {
                    axios
                        .post("http://localhost:3001/api/getNumber", {
                            base64: dataUrl.split(",")[1],
                            rows: this.state.rows,
                            cols: this.state.cols,
                        })
                        .then((res) => {
                            if (res?.data?.isbnNumber) {
                                localStorage.setItem("isbnNumber", res?.data?.isbnNumber);
                                this.refs.inputIsbn.value = res?.data?.isbnNumber;
                                this.searchWithIsbnNumber(res.data.isbnNumber);
                            } else {
                                alert("ISBN numarası okunamadı.");
                            }
                        });
                });
            }
        }
    }

    imageToBase64 = (url) =>
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
}