/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";

import History from "../history/History";
import Notifications from "../notifications/Notifications";
import { Link } from "react-router-dom";
import UpdateCourses from "../UpdateCourses";
import Logout from "../Logout";
import { PropTypes } from "prop-types";
import { ROLE } from "../../../utils/constants";
import UserGuides from "../UserGuides";

function HeadAdvisorNavDesktop({ currentPlan, role }) {
  const style = css``;
  return (
    <div className="advisor-nav" css={style}>
      <UserGuides role={role} />
      <History currentPlan={currentPlan} />
      <Notifications />
      {role === ROLE.HEAD_ADVISOR && (
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

export default HeadAdvisorNavDesktop;

HeadAdvisorNavDesktop.propTypes = {
  currentPlan: PropTypes.number,
};
