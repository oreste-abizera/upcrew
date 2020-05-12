import React from 'react'
import styled from "styled-components";

export default function Modal({buttonName,header,body,footer}) {
    const openModal = ()=>{
        document.getElementById("modal-container").style.display="block"
      }
      const closeModal = ()=>{
        document.getElementById("modal-container").style.display="none"
      }
      return <ModalWrapper><div className="w3-container">
    <button onClick={openModal} className="ado-btn">{buttonName || "Open Modal"}</button>
  <div id="modal-container" className="w3-modal">
    <div className="w3-modal-content">
      <header className="w3-container w3-teal"> 
        <span onClick={closeModal}
        className="w3-button w3-display-topright">&times;</span>
        {header || <h2>Modal Header</h2>}
      </header>
      <div className="w3-container">
        {body || <>
        <p>some text....</p>
        <p>some text....</p>
        </>}
      </div>
      <footer className="w3-container w3-teal">
        {footer || <h2>Modal footer</h2>}
      </footer>
    </div>
  </div>
</div>
</ModalWrapper>
}

const ModalWrapper = styled.div``