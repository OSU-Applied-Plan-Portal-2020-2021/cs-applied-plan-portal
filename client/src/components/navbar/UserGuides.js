/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ROLE } from "../../utils/constants";
import { Link } from "react-router-dom";
function UserGuides({ role }) {
  return (
    <div>
      {role === ROLE.STUDENT ? (
        <Link to="/guides/students">
          <button>User Guide</button>
        </Link>
      ) : (
        <Link to="/guides/advisors"></Link>
      )}
    </div>
  );
}

export default UserGuides;
