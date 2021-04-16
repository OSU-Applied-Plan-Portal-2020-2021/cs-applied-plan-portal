import { combineReducers } from "redux"
import { ADD_COURSE_TO_PLAN, REMOVE_COURSE_FROM_PLAN, POPULATE_PLAN } from "./actions"

const planCoursesReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_COURSE_TO_PLAN:
			// console.log('add to plan: ', action.payload)
			return [...state, action.payload]

		case REMOVE_COURSE_FROM_PLAN:
			// payload is courseId
			return state.filter(course => course.courseId !== action.payload.courseId)

		case POPULATE_PLAN:
			return action.payload

		default:
			return state
	}
}

const rootReducer = combineReducers({
	planCourses: planCoursesReducer,
})

export default rootReducer
