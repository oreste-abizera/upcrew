import axios from "axios";
import { url } from "../helpers/url";

async function loginUser({ identifier, password }) {
  let errorResponse;
  let response = await axios
    .post(`${url}/api/v1/auth/login`, {
      identifier,
      password,
    })
    .catch((error) => (errorResponse = error.response));
  if (response) {
    return response;
  } else {
    return errorResponse;
  }
}

export default loginUser;
