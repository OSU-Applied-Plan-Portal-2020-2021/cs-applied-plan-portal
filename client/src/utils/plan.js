export function checkCourseIsAdded(courseId, planCourses) {
	planCourses.forEach(planCourse => {
		if (planCourse.courseId === courseId)
			return true
	})
	return false
}