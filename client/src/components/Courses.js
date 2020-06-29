import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
	state = {
		courses : []
	};

	componentDidMount() {
		this.fetchItems();
	}

	fetchItems = async () => {
		try {
			const data = await fetch('http://localhost:5000/api/courses');
			const courses = await data.json();
			this.setState({ courses });
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
				<button id="new-course">
					<Link to="/courses/create">
						New Course
					</Link>
				</button>
			</>
		);
	}
}

export default Courses;
