import React from "react";
import ProfileItem from "./ProfileItem";
export default function ProfileList({ data }) {
  return (
    <div className="mt-4 mb-5">
      {data.map((item, index) => (
        <ProfileItem key={index} {...item} index={index}></ProfileItem>
      ))}
    </div>
  );
}
