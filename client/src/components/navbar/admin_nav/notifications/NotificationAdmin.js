import React from "react";
import {Mobile, Desktop} from "../../../../utils/responsiveUI";
import NotificationDesktop from "./NotificationDesktop";
import NotificationMobile from "./NotificationMobile";
import {PropTypes} from "prop-types";

function NotificationAdmin({notifications, handleClick}) {
  return (
    <React.Fragment>
      <Desktop>
        <NotificationDesktop
          notifications={notifications}
          handleClick={handleClick}
        />
      </Desktop>
      <Mobile>
        <NotificationMobile
          notifications={notifications}
          handleClick={handleClick}
        />
      </Mobile>
    </React.Fragment>
  );
}

export default NotificationAdmin;

NotificationAdmin.propTypes = {
  notifications: PropTypes.array,
  handleClick: PropTypes.func,
};