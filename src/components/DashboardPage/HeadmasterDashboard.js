import React from "react";
import { UserContext } from "../../context/UserContext";
import DashboardCount from "./sub-components/DashboardCount";

export default function HeadmasterDashboard() {
  const { users } = React.useContext(UserContext);
  return (
    <div>
      <DashboardCount users={users}></DashboardCount>
    </div>
  );
}
