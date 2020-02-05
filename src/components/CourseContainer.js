import React from "react";
import Course from "./Course";
import FilterBar from "./FilterBar";
import filters from "./FilterList";
import PropTypes from "prop-types";
import "../public/index.css";
export default class CourseContainer extends React.Component {
  static get propTypes() {
    return {
      updateCourses: PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      addCourses: [],
      filter: ""
    };

    this.filterSearch = this.filterSearch.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.addCourse = this.addCourse.bind(this);
  }

  async filterSearch() {

    const value = document.getElementById("search-container").value;
    const codeUrl = `/api/course/courseCode/${value}`;
    const nameUrl = `/api/course/courseName/${value}`;
    let obj = [];

    try {
      const results = await fetch(codeUrl);
      if (results.ok) {
        obj = await results.json();
        this.setState({
          courses: obj
        });
      } else {
        const results = await fetch(nameUrl);
        if (results.ok) {
          obj = await results.json();
          this.setState({
            courses: obj
          });
        } else {
        // we got a bad status code
          try {
            throw results;
          } catch (err) {
            err.text().then(errorMessage => {
              alert(errorMessage);
            });
          }
        }
        // we got a bad status code
        try {
          throw results;
        } catch (err) {
          err.text().then(errorMessage => {
            alert(errorMessage);
          });
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  async handleFilterChange(value) {
    this.setState({
      filter: value
    });
    if (value !== "none") {
      const url = `/api/course/courseCode/${value}`;
      let obj = [];

      try {
        const results = await fetch(url);
        if (results.ok) {
          obj = await results.json();
          this.setState({
            courses: obj
          });
        } else {
        // we got a bad status code
          try {
            throw results;
          } catch (err) {
            err.text().then(errorMessage => {
              alert(errorMessage);
            });
          }
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  addCourse(course) {
    // check that new course isn't already in array
    let newCourse = true;
    for (let i = 0; i < this.state.addCourses.length; i++) {
      // check for duplicate courses
      if (course.code === this.state.addCourses[i].code) {
        this.setState({
          warning: "This course is already in your plan."
        });
        newCourse = false;
        return;
      }
      // check for required courses
      if (course.restriction === 1) {
        this.setState({
          warning: "You've selected a required course."
        });
      }
      // check for graduate courses
      if (course.restriction === 2) {
        this.setState({
          warning: "You've selected a graduate course."
        });
      }
    }

    if (newCourse) {
      const newCourses = this.state.addCourses;
      newCourses.unshift(course);
      this.setState({
        addCourses: newCourses
      });
      this.props.updateCourses(newCourses);
    }
  }

  render() {
    return (
      <div className="course-container">
        <div className="top-bar">
          <div className="search-container">
            <form className="form form-inline my-2 my-lg-0">
              <input id="search-container" className="form-control mr-sm-2" type="text" placeholder="Search.." name="search"/>
            </form>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.filterSearch}><i className="fa fa-search"></i></button>
          </div>
          <form className="course-filter form-group">
            <FilterBar options={filters} value={this.state.filter} onValueChange={this.handleFilterChange}/>
          </form>
        </div>
        <div className="warning-box">
          {this.state.warning ? <p>{this.state.warning}</p> : null}
        </div>
        <div className="explore-courses">
          {this.state.courses.length > 0 ? this.state.courses.map(c => <Course key={c.courseCode} code={c.courseCode} title={c.courseName} credits={c.credits}
            description={c.description} prereqs={c.prerequisites} restriction={c.restriction} addCourse={this.addCourse}/>) :
            <div>Search for courses...</div>}
        </div>
      </div>
    );
  }
}