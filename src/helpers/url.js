export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://upcrew-api.herokuapp.com";
export const defaultImg = `${url}/uploads/avatar.jpg`;
