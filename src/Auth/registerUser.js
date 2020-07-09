import axios from "axios";
import { url } from "../helpers/url";

async function registerUser({
  firstName,
  lastName,
  userName,
  email,
  password,
  gender,
  dateOfBirth,
  userCountry,
}) {
  let errorResponse;
  let response = await axios
    .post(`${url}/api/v1/auth/register`, {
      firstName,
      lastName,
      userName,
      userEmail: email,
      userPassword: password,
      gender,
      dateOfBirth,
      userCountry,
    })
    .catch((err) => (errorResponse = err.response));
  if (response) {
    return response;
  } else {
    return errorResponse;
  }
}

export default registerUser;
