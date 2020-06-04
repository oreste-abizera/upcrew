import axios from "axios";

async function registerUser({
  firstName,
  lastName,
  userName,
  email,
  password,
  gender,
  dateOfBirth,
  userCountry
}) {
  let errorResponse
  let response = await axios
    .post("http://localhost:5000/api/v1/auth/register", {
      firstName,
      lastName,
      userName,
      userEmail: email,
      userPassword: password,
      gender,
      dateOfBirth,
      userCountry
    })
    .catch((err) => errorResponse = err.response);
  if (response) {
    return response;
  } else {
    return errorResponse
  }

  //waiting for cms
  return null;
}

export default registerUser;
