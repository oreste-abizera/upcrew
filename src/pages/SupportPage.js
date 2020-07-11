import React from "react";
import Modal from "../components/Modal";

export default function SupportPage() {
  window.Toast.fire({
    icon: "error",
    title: "Sorry.There is no content on this page.",
  });

  return (
    <>
      <Modal buttonName="test modal"></Modal>
    </>
  );
}
