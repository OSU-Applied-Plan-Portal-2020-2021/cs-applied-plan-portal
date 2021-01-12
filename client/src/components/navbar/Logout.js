/** @jsx jsx */
import React from 'react'
import { css, jsx } from "@emotion/core";
import { logout } from "../../utils/authService";
import { Mobile, Desktop } from '../../utils/responsiveUI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt as signoutIcon } from '@fortawesome/free-solid-svg-icons'

// logout button
function Logout() {

  const style = css`

    & {
      height: 35px;
      border: 1px solid white;
      color: white;
      border-radius: 0.25rem;
      background: transparent;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }

  `;

  // logout the current user
  function logoutUser() {
    logout();
  }

  return (

    <React.Fragment>
      <Desktop>
        <button className="logout-button" css={style} onClick={() => logoutUser()}>
          Log Out
       </button>
      </Desktop>
      <Mobile>
        <FontAwesomeIcon icon={signoutIcon} size='lg' />
      </Mobile>
    </React.Fragment>




  );

}
export default Logout;