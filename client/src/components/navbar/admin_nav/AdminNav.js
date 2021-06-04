import React from "react";
import {Desktop, Mobile} from "../../../utils/responsiveUI";
import AdminNavDesktop from "./AdminNavDesktop";
import AdminNavMobile from "./AdminNavMobile";
import propTypes from "prop-types";

function AdminNav(props) {

  return (
    <>
      <Mobile>
        <AdminNavMobile currentPlan={props.currentPlan} role={props.role} />
      </Mobile>
      <Desktop>
        <AdminNavDesktop currentPlan={props.currentPlan} role={props.role}/>
      </Desktop>
    </>
  );
}

export default AdminNav;

AdminNav.propTypes = {
  currentPlan: propTypes.number
};