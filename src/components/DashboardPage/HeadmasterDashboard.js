import React from "react";
import { UserContext } from "../../context/UserContext";
import { MessagesContext } from "../../context/MessagesContext";
import DashboardCount from "./sub-components/DashboardCount";

export default function HeadmasterDashboard() {
  const { users, user, books } = React.useContext(UserContext);
  const { messages } = React.useContext(MessagesContext)
  return (
    <div>
      <DashboardCount users={users} messages={messages} me={user.user.id} books={books}></DashboardCount>
    </div>
  );
}
