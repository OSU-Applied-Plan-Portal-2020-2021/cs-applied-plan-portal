/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ROLE } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Desktop } from "../../utils/responsiveUI";
import React from "react";
function UserGuides({ role }) {
  return (
    <div>
      <Desktop>
        {role === ROLE.STUDENT ? (
          <Link to="/guides/students">
            <button>User Guide</button>
          </Link>
        ) : (
          <>
            <Link to="/guides/students">
              <button>Student Guide</button>
            </Link>
            <Link to="/guides/advisors">
              <button>Advisor Guide</button>
            </Link>
          </>
        )}
      </Desktop>
    </div>
  );
}

export default UserGuides;
