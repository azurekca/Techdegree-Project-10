import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {
	state = {
    loading: true,
    course : {}
	};

	componentDidMount() {
    this.fetchCourse();
	}

	fetchCourse = async () => {
    // this gives access to the Data methods for talking to the api defined in Data.js and the actions defined in Context.js
    const { context } = this.props;
    
		try {
      // get course information from db
			const course = await context.actions.getCourse(this.props.match.params.id);
      if (course) {
        // update state
        this.setState({ loading: false, course });

        // set page title
      document.title = this.state.course.title
      } else{
        // 500
      }
		} catch (error) {
			console.log(error);
		}
  };

	render() {
    // check if data has been retrieved yet,
    // check if course wasn't found
    if (this.state.loading) {
      return <p>loading...</p>
    } else if (this.state.course === 404) {
      return <p>Course not found</p>
    } else {
      const { course } = this.state;
      const { user } = course;

      return (
        <>
          {/* course action buttons will go here */}
          <button  className="course-action">
            <Link to={`/courses/${course.id}/update`}>Update Course</Link>
          </button>
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
