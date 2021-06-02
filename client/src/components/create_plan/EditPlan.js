/** @jsx jsx */

import {useState} from "react";
import EditPlanTable from "./EditPlanTable";
import ErrorMessage from "../general/ErrorMessage";
import PropTypes from "prop-types";
import {css, jsx} from "@emotion/core";
import {getProfile, login} from "../../utils/authService";
import { Desktop, Mobile } from "../../utils/responsiveUI";
import {SCREENWIDTH} from "../../utils/constants";
import { formatFocus } from "../../utils/formatFocus";
import Modal from 'react-modal';

Modal.setAppElement('#root')

// edit plan form
function EditPlan(props) {

  const [warning, setWarning] = useState("");
  const [modalIsOpen, setIsOpen] =useState(false);

  const width = SCREENWIDTH.MOBILE.MAX;

  const ModalStyles = {
    overlay : {
      background              : "rgba(0,0,0,0.5)"
    },
     content : {
    position             : "relative",
    inset                : "103px 0px 0px 0px",
    border               : "1px solid transparent",
    background           :  "transparent",
    margin               : "0px",
    padding              : "0px",
    height               : "80vh",
    borderRadius         : "0px",
    overflow             : "visible"
  },
  button : {
    background            : "#e7501c",
    position              : "relative",
    top                   : "-3vh",
    border                : "1px solid transparent",
    borderRadius          : "6px",
    color                 : "white",
    fontSize              : "3rem",
    padding               : "0px 10px",
    margin                : "1% 4%",
    float                 : "right"

  },
  fontOfButton : {
    position              : "relative",
    top                   : "-14%"
  }, 
  submitPlanError : {
    position              : "relative",
    top                   : "-3%",
    width                 : "75vw"
  }
};

  const style = css`
    & {
      grid-area: plan;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr auto;
      grid-row-gap: 1rem;
      grid-template-areas: 'title'
                          'table'
                          'submit';
      @media(max-width: ${width}px){
        height: 98%;
        overflow: auto;
        grid-template-columns: auto;
        grid-template-rows: auto 1fr auto;
        padding: 0px 5px 0px 5px;
        grid-template-areas: 'title'
                            'focus'
                          'table'
                          'submit';
      }
    }
    
    #title {
      grid-area: title;
      display: flex;
      align-items: stretch;
    }
    
    #title-input {
      font-size: x-large;
      padding: 0.5rem 1rem;
      font-family: 'Muli', sans-serif;
      font-weight: bold;
      border-radius: 0.5rem;
      border: 1.5px solid #dfdad8;
      @media(max-width: ${width}px){
          width: 90%;
          height: 34px;
          font-size: 20px;
      }
    }
    
    #title-credits {
      margin-left: auto;
      margin-right: 18px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      text-align: center;
      font-weight: bold;
      @media(max-width: ${width}px){
          margin: 0px 10px;
         
          display:block;
          height: fit-content;
      }
      
    }
    
    #credits-count {
      font-size: 18px;
      @media(max-width: ${width}px){
          font-size: 14px;
      }
    }
    
    #credits-label {
      font-size: 14px;

      @media(max-width: ${width}px){
        font-size: 12px;
      }
    }
    
    #focus-name-container {
        grid-area: focus;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #focus-name-container p {
        margin: 0
    }

    #submit {
      grid-area: submit;
      text-align: right;
    }
    
    #submit-button {
      background: var(--color-blue-500);
      color: var(--color-blue-50);
      padding: 1rem 1rem;
      border-radius: 0.5rem;
      border: none;
    }

    #edit-note {
        border-radius: 0.5rem;
        padding: 0.5rem;
        background: var(--color-yellow-50);
        border: 1px solid var(--color-yellow-300);
        color: var(--color-yellow-800);
        display: flex;
        align-items: center;
        @media(max-width: ${width}px) {
            max-width: 72%;
            font-size: 12px;
        }
    }

    #edit-note p {
        margin-bottom: 0;
    }

    #footer-container {
        display: flex;
        justify-content: space-between;
    }

    #submit-plan-error {
      margin: 0 auto;
      text-align: center;
      @media(max-width: ${width}px){
        position: relative;
        top: -3%;
        width: 75vw;;
      }
    }

    #submit-plan-error div {
      height: 100%;
    }

  `;

  // create a new plan by submitting a set of courses and a plan name
  async function submitPlan() {
    // get plan name from input field
    const planName = document.getElementById("title-input").value;
    if (validatePlan(planName)) {

      // create an array of strings containing course IDs
      const courses = [];
      for (let i = 0; i < props.courses.length; i++) {
        courses.push({
          courseId: props.courses[i].courseId,
          credits: props.courses[i].credits
        });
      }

      // check to see if we should perform a POST request or a PATCH request
      if (props.edit) {
        editPlan(courses, planName, props.edit);
      } else {

        // set up data for new plan to send to backend
        const profile = getProfile();
        const postURL = `/api/plan`;
        const postObj = {
          planName: planName,
          courses: courses,
          userId: profile.userId,
          planFocus: props.focus
        };

        try {
          props.onLoading(true);

          const results = await fetch(postURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
          });

          if (results.ok) {
            // redirect to the view plan of the newly submitted plan,
            // else give the user a warning with backend error message
            const obj = await results.json();
            window.location.href = `/viewPlan/${obj.insertId}`;
          } else if (results.status === 403) {
            // if the user is not allowed to create a plan,
            // redirect to login to allow updating of user info
            login();
          } else {
            const obj = await results.json();
            setWarning(obj.error);
          }

        } catch (err) {
          // this is a server error
          setWarning("An internal server error occurred. Please try again later.");
        }
        props.onLoading(false);
      }
    }else{
        openModal();
    }
  }

  // update a plan by submitting a different set of courses and/or plan name
  async function editPlan(courses, planName, planId) {
    // set up data for new plan to send to backend
    const patchURL = `/api/plan`;
    const patchObj = {
      planId: planId,
      planName: planName,
      courses: courses
    };

    try {
      props.onLoading(true);

      const results = await fetch(patchURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patchObj)
      });

      if (results.ok) {
        // redirect to the view plan of updated plan
        window.location.href = `/viewPlan/${planId}`;
      } else {
        const obj = await results.json();
        setWarning(obj.error);
        openModal();
      }

    } catch (err) {
      // this is a server error
      setWarning("An internal server error occurred. Please try again later.");
    }
    props.onLoading(false);
  }

  function validatePlan(planName) {
    const NAME_MIN = 5;
    const NAME_MAX = 50;
    const CREDITS_MIN = 32;

    // check that plan name has a valid length
    if (planName.length < NAME_MIN || planName.length > NAME_MAX) {
      setWarning(`Plan name must be between ${NAME_MIN} and ${NAME_MAX} characters.`);
      return false;
    }
    // check that at least 1 core course option is picked
    // if reqCourse is empty skip this check
    if (props.reqCourse && props.reqCourse.length > 0) {
        let hasReqCourse = false;
        for (let i = 0; i < props.courses.length; i++) {
            // reqCourse contain list of core course option
            // Student must take at least one course from reqCourse list
            for (let j = 0; j < props.reqCourse.length; j++) {
                if (props.courses[i].courseCode === props.reqCourse[j]) {
                    hasReqCourse = true;
                    break;
                }
            }
            if (hasReqCourse) {
                break;
            }
        }
        if (hasReqCourse === false) {
            setWarning(`Plan must contain at least 1 course from the following list: ${props.reqCourse.join(", ")}.`);
            return false;
        }
    }
    // check that the minimum amount of credits are selected
    const credits = loadCredits();
    if (credits < CREDITS_MIN) {
      setWarning(`Plan must have at least ${CREDITS_MIN} credits.`);
      return false;
    }

    return true;
  }

  // sum all the credits from the courses, return an int
  function loadCredits() {
    let totalCredits = 0;
    for (let i = 0; i < props.courses.length; i++) {
      totalCredits += parseInt(props.courses[i].credits, 10);
    }
    return totalCredits;
  }

  // update the value of the plan name when the field is changed
  function updatePlanName(e) {
    setWarning("");
    props.onChangePlanName(e.target.value);
  }

  // show error modal
  function openModal(){
    setIsOpen(true);
  }

  // close error modal
  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div id="edit-container" css={style}>
      <div id="title">
        <input id="title-input"
          type="text"
          placeholder={"Enter plan name"}
          value={props.planName}
          onChange={updatePlanName}
        />

        <Desktop>
          <div id="submit-plan-error">
            <ErrorMessage text={warning} className="error-hide-conditional"/>
          </div>
        </Desktop>

        <Mobile>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={ModalStyles}
          >
            <button onClick={closeModal} style={ModalStyles.button}>
              <i class="fas fa-times" style={ModalStyles.fontOfButton}></i>
            </button>
            <div id="submit-plan-error" style={ModalStyles.submitPlanError}>
              <ErrorMessage text={warning} className="error-hide-conditional"/>
            </div>
          </Modal>
            
        
        </Mobile>
        
        <Desktop>
            <div id="focus-name-container">
                <p>Focus: {formatFocus(props.focus)}</p>
            </div>
        </Desktop>

        <div id="title-credits">
          <div id="credits-count">{loadCredits()}</div>
          <div id="credits-label">credits</div>
        </div>
      </div>
      <Mobile>
        <div id="focus-name-container">
            <p>Focus: {formatFocus(props.focus)}</p>
        </div>
      </Mobile>
      
      {props.courses.length > 0 ? (
        <EditPlanTable
          courses={props.courses}
          onRemoveCourse={props.onRemoveCourse}
        />
      ) : (
        <div className="no-courses-msg">
          <h2 className="empty-plan-title">No courses!</h2>
          <h4 className="empty-plan-description">Use the search bar to find courses and add them to your plan.</h4>
        </div>
      )}
        <div id="footer-container">
            <div id="edit-note">
                    <p id="note-text">
                        <span>Note:</span> For more details about applied plan requirements please refer to 
                        <a href="https://eecs.oregonstate.edu/undergraduate-programs/computer-science"> this page </a>
                        before submitting your plan.
                    </p>
            </div>
            {props.courses.length > 0 ? (
                <div id="submit">
                <button id="submit-button" onClick={submitPlan}>
                    {props.edit ? "Save Plan" : "Submit Plan"}
                </button>
                </div>
            ) : (
                null
            )}
        </div>
    </div>
  );

}
export default EditPlan;

EditPlan.propTypes = {
  onRemoveCourse: PropTypes.func,
  courses: PropTypes.array,
  edit: PropTypes.number,
  planName: PropTypes.string,
  onChangePlanName: PropTypes.func,
  onLoading: PropTypes.func,
  focus: PropTypes.number
};