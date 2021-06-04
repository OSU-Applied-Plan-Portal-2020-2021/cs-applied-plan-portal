import React from "react";
import {Desktop, Mobile} from "../../../../utils/responsiveUI";
import HistoryCommon from "../../history/HistoryCommon";
import PropTypes from "prop-types";
import HistoryAdminMobile from "../../history/HistoryAdminMobile";

function HistoryAdmin({recentPlans}) {
  return (
    <React.Fragment>
      <Desktop>
        <HistoryCommon recentPlans={recentPlans} />
      </Desktop>
      <Mobile>
        <HistoryAdminMobile recentPlans={recentPlans}/>
      </Mobile>
    </React.Fragment>
  );
}

export default HistoryAdmin;

HistoryAdmin.propTypes = {
  recentPlans: PropTypes.array,
};