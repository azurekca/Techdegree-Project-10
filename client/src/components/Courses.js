import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
	state = {
		courses : []
	};

	componentDidMount() {
		this.fetchCourses();
	}

	fetchCourses = async () => {

		// this gives access to the Data methods for talking to the api defined in Data.js and the actions defined in Context.js
		const { context } = this.props;
		
		try {
			// get all the courses from the database
			const courses = await context.actions.getCourses();
			if (courses) {
				this.setState({ courses });
			} else {
				// 500
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<>
				<h1>Courses</h1>
				{this.state.courses.map(course => {
						return (
							<article key={course.id}>
								<Link to={`/courses/${course.id}`}>
									<p>Course</p>
									<h2>{course.title}</h2>
								</Link>
							</article>
						);
					}
				)}
				<button className="course-action">
					<Link to="/courses/create">
						New Course
					</Link>
				</button>
			</>
		);
	}
}

export default Courses;
