import React, { Component } from "react";
import updatesData from "./updatesData";
import socialData from "./socialData";
import pageLinksData from "./pageLinksData";
import loginUser from "../Auth/loginUser";
import registerUser from "../Auth/registerUser";
import { UserContext } from "./UserContext";

const AdoContext = React.createContext();
class AdoProvider extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      updatesData,
      socialData,
      pageLinksData,
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPass: "",
      agree: false,
      isMember: true,
      touched: {
        login: false,
        register: false,
      },
      alert: { show: false, message: "", type: "success" },
      height: 0,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.setState({
        height: window.pageYOffset,
      });
    });
    return () => window.removeEventListener("scroll", () => {});
  }

  showAlert = ({ message, type = "success" }) => {
    this.setState({
      alert: { show: true, message, type },
    });
  };
  hideAlert = () => {
    this.setState({
      alert: { ...this.state.alert, show: false },
    });
  };

  changeIsMember = (value) => {
    this.setState({
      isMember: value,
    });
  };
  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (this.state.isMember) {
      let loginData = {
        identifier: this.state.userName,
        password: this.state.password,
      };
      //login User
      response = await loginUser({ ...loginData });
    } else {
      let registerData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
      };
      //register user
      response = await registerUser({ ...registerData });
    }
    this.showAlert({ message: "Accessing Your data. Please wait...." });
    if (response) {
      const { userLogin } = this.context;
      // const {
      //   jwt: token,
      //   user: { username },
      // } = response.data;
      // const newUser = { username, token };

      const newUser = { ...response };
      userLogin(newUser);
      // this.showAlert({
      //   message: `Congratulations ${newUser.username}, you are now logged in.`,
      // });
      this.hideAlert()
    } else {
      this.showAlert({
        message: "Something went wrong. Please try again later.",
        type: "danger",
      });
    }
  };

  //changing touched state for login and register errors
  changeTouched = (type) => {
    if (type === "login") {
      if (!this.state.touched.login)
        this.setState({
          touched: { ...this.state.touched, login: true },
        });
    } else {
      if (!this.state.touched.register)
        this.setState({
          touched: { ...this.state.touched, register: true },
        });
    }
  };

  render() {
    return (
      <AdoContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
          changeIsMember: this.changeIsMember,
          showAlert: this.showAlert,
          hideAlert: this.hideAlert,
          changeTouched: this.changeTouched,
          changePageLinks: this.changePageLinks,
        }}
      >
        {this.props.children}
      </AdoContext.Provider>
    );
  }
}

export { AdoProvider, AdoContext };
