import axios from "axios";
import { formatUser } from "../helpers/functions";
async function formatResponse(res, identifier, password) {
  const userWithEmail = res.find(
    (item) => item.userEmail === identifier && item.userPassword === password
  );
  const userWithUsername = res.find(
    (item) => item.userName === identifier && item.userPassword === password
  );
  if (userWithEmail) {
    return {
      username: userWithEmail.userName,
      token: "qwefrtrythrgdfdsfytvtre",
      user: await formatUser(userWithEmail),
    };
  }
  if (userWithUsername) {
    return {
      username: userWithUsername.userName,
      token: "qwefrtrythrgdfdsfytvtre",
      user: await formatUser(userWithUsername),
    };
  }
  return null;
}
async function loginUser({ identifier, password }) {
  //   let response = await axios
  //     .post("url", {
  //       identifier,
  //       password,
  //     })
  //     .catch((error) => console.log(error));
  // return response

  //waiting for headless cms
  let response = await axios
    .get("./db/users.json")
    .catch((error) => console.log(error));
  response = await formatResponse(response.data, identifier, password);
  return response;
}
export default loginUser;
