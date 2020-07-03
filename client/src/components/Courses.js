import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
	state = {
		loading: true,
		courses : []
	};

	componentDidMount() {
		document.title = 'Courses'
		this.fetchCourses();
	}

	// Get all courses from the api, set state if retrieved, error page if not.
	fetchCourses = async () => {

		// this gives access to the Data methods for talking to the api defined in Data.js and the actions defined in Context.js
		const { context } = this.props;
		
		try {
			// get all the courses from the database
			const courses = await context.data.getCourses();
			this.setState({ loading: false, courses });
		} catch (error) {
			console.log(error);
			// pushing to history stack will redirect to error page
			this.props.history.push('/error'); 
		}
	};

	render() {
		// check if data has been retrieved yet,
    if (this.state.loading) {
      return <p>loading...</p>
    } else {
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
}

export default Courses;
