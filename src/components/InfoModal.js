import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export default function InfoModal(props) {
  const [title, setTitle] = useState(props.title ?? "Bilgilendirme");
  const [subTitle, setSubTitle] = useState(props.subTitle ?? "");
  const [text, setText] = useState(props.text ?? "Sitemize hoşgeldiniz...");
  const [closeButtonText, setCloseButtonText] = useState(
    props.closeButtonText ?? "Kapat"
  );
  useEffect(() => {
    setTitle(props.title ?? "Bilgilendirme");
    setText(props.text ?? "Sitemize hoşgeldiniz...");
    setSubTitle(props.subTitle ?? "");
    setCloseButtonText(props.closeButtonText ?? "Kapat");
  }, [props]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="section-title"
        >
          <h4>{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{subTitle}</h4>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onHide}>
          {closeButtonText}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
