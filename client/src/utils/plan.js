export function checkCourseIsAddedAsync(courseId, planCourses) {
	return new Promise((resolve, reject) => {
		planCourses.forEach(planCourse => {
			if (planCourse.courseId === courseId)
				return resolve(true)
		})
		return resolve(false)
	})
}