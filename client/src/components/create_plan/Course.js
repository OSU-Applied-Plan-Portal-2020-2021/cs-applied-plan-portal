/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { Mobile, Desktop } from "../../utils/responsiveUI";
import { SCREENWIDTH } from "../../utils/constants";
import ErrorMessage from "../general/ErrorMessage";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToPlan, removeCourseFromPlan } from "../../redux/actions";
import { getCoursesFromPlan } from "../../redux/selectors";
import { useEffect } from "react";
import { checkCourseIsAddedAsync } from "../../utils/plan";
import { FaCheck, FaCheckCircle, FaPlus } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";

// a single course description
function Course(props) {
  const dispatch = useDispatch();
  const planCourses = useSelector(getCoursesFromPlan);

  const width = SCREENWIDTH.MOBILE.MAX;
  const style = css`
    & {
      margin-bottom: 1rem;
      background: #f4f2f1;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
      @media (max-width: ${width}px) {
        margin-right: 0;
        box-sizing: border-box;
      }
    }

    summary + p {
      margin-top: 1rem;
    }

    details summary::-webkit-details-marker {
      display: none;
    }

    summary::-moz-list-bullet {
      list-style-type: none;
      display: block;
    }

    details summary:before {
      content: "⯈";
      display: inline-block;
      padding: 0 5px 5px 0;
    }

    details[open] summary:before {
      content: "⯆";
      display: inline-block;
      padding: 0 5px 5px 0;
    }

    details summary {
      cursor: pointer;
      height: unset;
      width: 100%;
      display: inline-flex;
      align-items: center;
      user-select: none;
      justify-content: space-between;
    }

    .add-button {
      /* display: inline-block; */
      /* margin-left: auto; */
      padding: 10px;
      background: var(--color-green-500);
      color: var(--color-green-50);
      border-radius: 5px;
      border: none;
      width: 96px !important;
      margin-left: 10px;
      line-height: 20px;
    }

    .added-checkmark {
      font-size: 17px;
    }

    .added-button {
      background-color: var(--color-green-300);
    }

    .disabled {
      background: var(--color-lightgray-700);
      color: var(--color-gray-50);
      /* pointer-events: none; */
      cursor: default;
    }

    .course-title {
      display: inline-block;
      vertical-align: bottom;
      font-weight: 600;
      flex-grow: 1;
      text-transform: uppercase;
      width: 245px;
    }

    .course-code {
      color: var(--color-gray-400);
      font-weight: normal;
    }

    p:last-child {
      margin-bottom: 0;
    }

    hr {
      border-top-color: #e6e6e5;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `;
  let notEligible = false;
  if (props.restriction > 0) notEligible = true;
  const [added, setAdded] = useState(false);
  useEffect(() => {
    async function checkAdded() {
      const result = await checkCourseIsAddedAsync(props.courseId, planCourses);
      setAdded(result);
    }
    checkAdded();
  });

  // add the course to the plan
  function handleAddCourse() {
    const courseObject = {
      courseId: props.courseId,
      courseCode: props.courseCode,
      courseName: props.courseName,
      credits: props.credits,
      description: props.description,
      prerequisites: props.prerequisites,
      restriction: props.restriction,
    };

    props.onAddCourse(courseObject);
    setAdded(true);
    dispatch(addCourseToPlan(courseObject));
  }

  return (
    <div className="course" css={style}>
      <details>
        <summary>
          <div className="course-title">
            {props.courseName}
            <div className="course-code">
              <small>{props.courseCode}</small>
            </div>
          </div>
          {notEligible ? (
            <button className="add-button disabled" onClick={handleAddCourse}>
              Not Eligible
            </button>
          ) : (
            <button
              className={`add-button ${notEligible && "disabled"} ${
                added && "added-button"
              }`}
              onClick={handleAddCourse}
            >
              <Desktop>
                {added ? (
                  <>
                    <span className="added-checkmark">
                      <FaCheck />
                    </span>
                  </>
                ) : (
                  "Add to plan"
                )}
              </Desktop>
              <Mobile>
                {added ? (
                  <>
                    <span className="added-checkmark">
                      <FaCheck />
                    </span>
                  </>
                ) : (
                  <i class="fas fa-plus"></i>
                )}
              </Mobile>
            </button>
          )}
        </summary>
        <p>
          {props.credits} credit hour{props.credits !== 1 && "s"}
          {props.prerequisites === "" && ", no prerequisites"}
        </p>
        {props.description !== "" && (
          <div>
            <hr />
            {/* <h4>Description</h4> */}
            <p>{props.description}</p>
          </div>
        )}
        {props.prerequisites !== "" && (
          <div>
            <hr />
            {/* <h4>Restrictions</h4> */}
            <p>{props.prerequisites}</p>
          </div>
        )}
      </details>
    </div>
  );
}

export default Course;

Course.propTypes = {
  courseId: PropTypes.number,
  courseCode: PropTypes.string,
  courseName: PropTypes.string,
  credits: PropTypes.string,
  description: PropTypes.string,
  prerequisites: PropTypes.string,
  restriction: PropTypes.number,
  onAddCourse: PropTypes.func,
  warning: PropTypes.string,
};
