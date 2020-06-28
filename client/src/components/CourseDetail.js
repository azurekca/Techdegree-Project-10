import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')

class CourseDetail extends Component {
	state = {
    loading: true,
    course : {}
	};

	componentDidMount() {
    this.fetchItems();
	}

	fetchItems = async () => {
		try {
      // get course information from db
			const data = await fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`);
      const course = await data.json();

      // update state
      this.setState({ loading: false, course });

      // set page title
      document.title = this.state.course.title
		} catch (error) {
			console.log(error);
		}
	};

	render() {
    if (this.state.loading) {
      return <p>loading...</p>
    } else {
      const { course } = this.state;
      const { user } = course;
      
      return (
        <>
          {/* course action buttons will go here */}
          <h2>Course</h2>
          <h1>{course.title}</h1>
          <p>by {user.firstName} {user.lastName}</p>
          <ReactMarkdown source={course.description} />
          <ReactMarkdown source={course.materialsNeeded} />
        </>
      );
    }
	}
}

export default CourseDetail;
