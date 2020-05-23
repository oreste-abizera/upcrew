import React from 'react'
import styled from "styled-components";

export default function Modal({ buttonName, header, body, opener = false, children, id = "modal01" }) {
  const openModal = () => {
    document.getElementById(id).style.display = "block"
  }
  const closeModal = () => {
    document.getElementById(id).style.display = "none"
  }
  return <ModalWrapper><div className="w3-container">
    {opener ? <div onClick={openModal}>
      {children}
    </div> : <button onClick={openModal} className="ado-btn">{buttonName || "Open Modal"}</button>}
    <div id={id} className="w3-modal">
      <div className="w3-modal-content w3-card-4 w3-animate-zoom">
        <header className="w3-container w3-teal modal-header modal-part">
          <span onClick={closeModal}
            className="w3-button w3-display-topright">&times;</span>
          <h2>{header || "Modal Header"}</h2>
        </header>
        <div className="w3-container modal-body">
          {body || <>
            <p>some text....</p>
            <p>some text....</p>
          </>}
        </div>
        <footer className="w3-container text-right">
          {/* <h2>{footer || "Modal Footer"}</h2> */}
          <button className="btn btn-danger my-2" onClick={closeModal}>Close</button>
        </footer>
      </div>
    </div>
  </div>
  </ModalWrapper>
}

const ModalWrapper = styled.div`
.modal-part{
  background: var(--primaryColor) !important;
}
.modal-body{
  overflow: auto;
}
`