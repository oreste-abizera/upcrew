import axios from "axios";
// import { formatUser } from "../helpers/functions";
// async function formatResponse(res, identifier, password) {
//   const userWithEmail = res.find(
//     (item) => item.userEmail === identifier && item.userPassword === password
//   );
//   const userWithUsername = res.find(
//     (item) => item.userName === identifier && item.userPassword === password
//   );
//   if (userWithEmail) {
//     return {
//       username: userWithEmail.userName,
//       token: "qwefrtrythrgdfdsfytvtre",
//       // user: await formatUser(userWithEmail),
//       user: userWithEmail
//     };
//   }
//   if (userWithUsername) {
//     return {
//       username: userWithUsername.userName,
//       token: "qwefrtrythrgdfdsfytvtre",
//       // user: await formatUser(userWithUsername),
//       user: userWithUsername
//     };
//   }
//   return null;
// }
async function loginUser({ identifier, password }) {
  let errorResponse
  let response = await axios
    .post("http://localhost:5000/api/v1/auth/login", {
      identifier,
      password,
    })
    .catch((error) => errorResponse = error.response);
  if (response) {
    return response
  } else {
    return errorResponse
  }

  //waiting for headless cms
  // let response = await axios
  //   .get("./db/users.json")
  //   .catch((error) => console.log(error));
  // response = await formatResponse(response.data, identifier, password);
  // return response;
}
export default loginUser;
