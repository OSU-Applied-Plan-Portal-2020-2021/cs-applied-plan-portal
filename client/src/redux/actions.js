export const ADD_COURSE_TO_PLAN = "ADD_COURSE_TO_PLAN"
export const REMOVE_COURSE_FROM_PLAN = "REMOVE_COURSE_FROM_PLAN"
export const POPULATE_PLAN = "POPULATE_PLAN"

export function addCourseToPlan(payload) {
	return { type: ADD_COURSE_TO_PLAN, payload: payload }
}

export function removeCourseFromPlan(payload) {
	return { type: REMOVE_COURSE_FROM_PLAN, payload }
}

export function populatePlan(payload) {
	return { type: POPULATE_PLAN, payload }
}
