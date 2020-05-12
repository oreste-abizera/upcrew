import React from "react";
import UserListItem from "./UserListItem";
import UserColumns from "./UserColumns";

export default function UserList({ data, actions, userClass }) {
  return (
    <div>
      {/* <hr></hr> */}
      <p className="text-center mt-5">{data.length} results found.</p>
      <UserColumns userClass={userClass}></UserColumns>
      {data.length > 0 ? (
        data.map((item, index) => (
          <UserListItem
            key={item.id}
            user={item}
            index={index}
            actions={actions}
            userClass={userClass}
          ></UserListItem>
        ))
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  );
}

UserList.defaultProps = {
  data: [],
  actions: true,
  userClass: true,
};
