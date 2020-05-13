import React from 'react'
import styled from "styled-components";

export default function Modal({buttonName,header,body,footer}) {
    const openModal = ()=>{
        document.getElementById("modal01").style.display="block"
      }
      const closeModal = ()=>{
        document.getElementById("modal01").style.display="none"
      }
      // closing the modal
var modal = document.getElementById('modal01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal()
  }
}
      return <ModalWrapper><div className="w3-container">
    <button onClick={openModal} className="ado-btn">{buttonName || "Open Modal"}</button>
  <div id="modal01" className="w3-modal">
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
      <footer className="w3-container w3-teal modal-part text-center">
      <h2>{footer || "Modal Footer"}</h2>
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