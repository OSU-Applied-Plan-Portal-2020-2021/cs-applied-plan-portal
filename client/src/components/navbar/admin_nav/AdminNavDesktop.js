import React from "react";
import History from "../history/History";
import Notifications from "../notifications/Notifications";
import { Link } from "react-router-dom";
import UpdateCourses from "../UpdateCourses";
import Logout from "../Logout";
import { PropTypes } from "prop-types";
import { ROLE } from "../../../utils/constants";

function AdminNavDesktop({ currentPlan, role }) {
  return (
    <div>
      <History currentPlan={currentPlan} />
      <Notifications />
      {role === ROLE.ADMIN && (
        <>
          <Link to={"/manageRoles"}>
            <button id="manage-roles-button">Manage Roles</button>
          </Link>
          <UpdateCourses />
        </>
      )}
      <Logout />
    </div>
  );
}

export default AdminNavDesktop;

AdminNavDesktop.propTypes = {
  currentPlan: PropTypes.number,
};
