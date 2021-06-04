/** @jsx jsx */
import Navbar from "../navbar/Navbar";
import React from "react";
import { css, jsx } from "@emotion/core";
import ImgHomepage from "../../images/advisor-guide-homepage.png";
import ImgSearch from "../../images/advisor-guide-search.png";
import ImgDetail1 from "../../images/advisor-guide-detail-1.png";
import ImgDetail2 from "../../images/advisor-guide-detail-2.png";

function UserGuideAdvisors() {
  const style = css`
    #container {
      width: 80%;
      margin: auto;
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
    }
  `;

  return (
    <div id="user-guide-advisors" css={style}>
      <Navbar currentPlan={0} />
      <div id="container">
        <h2>User guide for advisors</h2>
        <ol>
          <li>
            <p>
              1. From homepage, advisors can search for plans using student
              email, name, or plan name
            </p>
            <img src={ImgHomepage} />
          </li>
          <li>
            {" "}
            <p>2. Let's select Astronomy Plan as an example</p>
            <img src={ImgSearch} />
          </li>
          <li>
            <p>3. Advisors can see plan details...</p>
            <img src={ImgDetail1} />
          </li>
          <li>
            <p>
              4. ...and change plan status or comment on the plan. This is where
              advisors approve or reject the plan
            </p>
            <img src={ImgDetail2} />
          </li>
        </ol>
      </div>
    </div>
  );
}

export default UserGuideAdvisors;
