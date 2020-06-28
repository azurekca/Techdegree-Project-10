import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
	state = {
		course : {}
	};

	componentDidMount() {
    this.fetchItems();
    // document.title = this.course.title
	}

	fetchItems = async () => {
		try {
			const data = await fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`);
			const course = await data.json();
			this.setState({ course });
		} catch (error) {
			console.log(error);
		}
	};

	render() {

    const course = this.state.course;
    const user = course.user;
    console.log("type of: ", typeof user, "user: ", user); // this works
    // console.log(user.id) // this doesn't
		return (
			<>
        {/* course action buttons will go here */}
				<h2>Course</h2>
        <h1>{course.title}</h1>
        {/* <p>{user.firstName}</p> */}
        <pre>{course.description}</pre>
				
				
			</>
		);
	}
}

export default CourseDetail;
