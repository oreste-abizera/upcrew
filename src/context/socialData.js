import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default [
  {
    id: 1,
    icon: <FaFacebook className="icon" />,
    url: "https://web.facebook.com/oreste.abizera.9/",
    title: "Facebook: Oreste Abizera",
  },

  {
    id: 2,
    icon: <FaInstagram className="icon"></FaInstagram>,
    url: "https://www.instagram.com/coder__tauras/",
    title: "instagram: coder__tauras",
  },
  {
    id: 3,
    icon: <FaTwitter className="icon" />,
    url: "https://twitter.com",
    title: "Twitter: Oreste Abizera",
  },
  {
    id: 4,
    icon: <FaLinkedin className="icon" />,
    url: "https://www.linkedin.com/in/oreste-abizera-151bb9194",
    title: "LinkedIn: Oreste Abizera",
  },
  {
    id: 5,
    icon: <FaYoutube className="icon"></FaYoutube>,
    url: "https://www.youtube.com/",
    title: "Youtube: Coderspace",
  },
];
