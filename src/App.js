import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./w3css/w3css.css"
import Routes from "./Routes";
import Swal from "sweetalert2"
window.Swal = Swal

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  icon: "success"
})

window.Toast = toast
class App extends Component {
  render() {
    return <Routes></Routes>;
  }
}

export default App;
