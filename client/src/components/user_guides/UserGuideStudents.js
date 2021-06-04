/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import PageSpinner from "../general/PageSpinner";
import Navbar from "../navbar/Navbar";
import ImgHomepage from "../../images/student-guide-homepage.png";
import ImgSelectPlan from "../../images/student-guide-select-plan.png";
import ImgCreatePlan1 from "../../images/student-guide-create-plan.png";
import ImgCreatePlan2 from "../../images/student-guide-create-plan-2.png";
import ImgPlanDetail from "../../images/student-guide-plan-detail.png";

function UserGuideStudents() {
  const style = css`
    #container {
      width: 80%;
      margin: auto;
    }
    img {
      width: 100%;
      border: 1px solid #444;
    }
    li {
      margin-top: 28px;
    }
    p {
      font-size: 16px;
    }
  `;

  return (
    <div id="user-guide-students" css={style}>
      <Navbar currentPlan={0} />
      <div id="container">
        <h2>User guide for students</h2>
        <ol>
          <li>
            <p>1. From homepage, students can create a new plan</p>
            <img src={ImgHomepage} />
          </li>
          <li>
            {" "}
            <p>
              2. Select either a pre-approved plan or build your own custom plan
            </p>
            <img src={ImgSelectPlan} />
          </li>
          <li>
            <p>
              3. This page allows students to add or remove courses to build
              their plan
            </p>
            <img src={ImgCreatePlan1} />
          </li>
          <li>
            <p>4. Hit "submit" once finish adding courses</p>
            <img src={ImgCreatePlan2} />
          </li>
          <li>
            <p>
              5. This page allows students to review the plan detail, and make
              changes if necessary. Students can also communicate with advisors
              using the "Comment" section.
            </p>
            <img src={ImgPlanDetail} />
          </li>
        </ol>
      </div>
    </div>
  );
}

export default UserGuideStudents;
