/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Notifications from "./notifications/Notifications";
import History from "./history/History";
import Logout from "./Logout";
import { getProfile } from "../../utils/authService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeadAdvisorNav from "./head_advisor_nav/HeadAdvisorNav";
import logo from "./../../images/logo.png";
import { ROLE } from '../../utils/constants'

// application navigation bar
function Navbar(props) {
  // role and function to set role, default to 0 (Student)
  const [role, setRole] = useState(0);

  // retrieve the logged in user and set role accordingly
  // if user cannot be retrieved, default to the student role
  useEffect(() => {
    async function checkRole() {
      const profile = getProfile();
      setRole(profile.role);
    }

    checkRole();
  }, []);

  const responSize = "max-width: 860px";

  const style = css`
    & {
      display: flex;
      width: 100%;
      height: 50px;
      background-color: var(--color-orange-500);
      align-items: center;
      padding: 0rem 1rem;
      grid-area: header;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9;
      @media (${responSize}) {
        height: 65px;
      }
    }

    & a:first-of-type:hover {
      text-decoration: none;
    }

    & a:first-of-type {
      text-decoration-color: transparent !important;
      height: 100%;
    }

    .osu-logo {
      vertical-align: middle;
      font-size: large;
      font-weight: 600;
      margin: 0;
      margin-right: 1rem;
      color: white;
      height: 100%;
      display: flex;
      align-items: center;
      @media (${responSize}) {

      }
    }

    .logo-img {

      margin-left: 16px;
      height: 90%;

      @media (${responSize}) {

      }
      object-fit: contain;
    }

    .logo-text {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      text-align: center;
      top: 12px;
      left: 80px;


      @media (${responSize}) {
        display: block;
        position: absolute;
        text-align: center;
        top: 12px;
        left: 29%;
        width: 40%;
        height: 75px;
      }
    }

    .logo-text p {
      @media (${responSize}) {
        margin-bottom: 0px;
      }
    }

    #logo-title {
      margin-right: 6px;
    }

    #logo-title2 {
      @media (${responSize}) {
        font-size: 15px;
        font-weight: 500;
      }
    }

    /* Don't style the last item, but in a way that's safe for SSR. */
    .right-container button {
      height: 35px;
      border: 1px solid white;
      color: white;
      border-radius: 0.25rem;
      background: transparent;
      margin-right: 0.5rem;

      @media (${responSize}) {
        border: 1px solid transparent;
        font-size: 2em;
      }
    }

    .right-container {
      margin-left: auto;
      display: flex;
    }

    #manage-roles-button:hover {
      background: rgba(0, 0, 0, 0.15);
    }

    @media print {
      & {
        display: none;
      }
    }
  `;

  return (
    <div id="navbar" className="navbar-parent" css={style}>
      <Link to={"/"}>
        <div className="osu-logo">
          <img className="logo-img" src={logo} />
          <div className="logo-text">
            <p id="logo-title">OSU CS</p>
            <p id="logo-title2">Applied Plan</p>
          </div>
        </div>
      </Link>
      <div className="right-container">
        {role === ROLE.ADVISOR || role === ROLE.HEAD_ADVISOR ? (
          <HeadAdvisorNav currentPlan={props.currentPlan} role={role}/>
        ) : (
          <div>
            {/* {role ? <History currentPlan={props.currentPlan} /> : null} */}
            <Notifications />
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
}
export default withRouter(Navbar);

Navbar.propTypes = {
  currentPlan: PropTypes.number,
};
