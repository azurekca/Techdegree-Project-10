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
    const requestedCourseId = this.props.match.params.id;
    
		try {
      // get course information from db
			const course = await context.data.getCourse(requestedCourseId);
      // update state
      this.setState({ loading: false, course });

      // set page title
      document.title = this.state.course.title
		} catch (error) {
      console.log(error);
      if (error.message === '404') {
        this.props.history.push({
            pathname: '/notfound',
            state: {error: `The requested course id=${requestedCourseId} was not found.`}
          });
      } else {
        this.props.history.push('/error'); // push to history stack will redirect to error page
      }
		}
  };

  deleteCourse = (id) => {
    // this gets the signed in user and the data methods
    const { context } = this.props;
    const user = context.authenticatedUser

    context.data.deleteCourse(user.emailAddress, user.password, id)
      .then(data => {
        if (data === 'success') {
          // course deleted successfully, go to back to home page
          this.props.history.push('/');
        }
      })
      // handle errors and rejected promise: issue with endpoint, api down, network connectivity error
      .catch( error => {
        console.log(error);
        // pushing to history stack will redirect to error page
        this.props.history.push('/error'); 
      });
  }

	render() {
    // check if data has been retrieved yet,
    if (this.state.loading) {
      return <p>loading...</p>
    } else {
      const { course } = this.state;
      const { user } = course;

      let courseEditButtons = null;
      // check if logged in user owns this course
      if (course.userId === this.props.context.authenticatedUser?.id) {
        courseEditButtons = (
          <div>
            <button  className="course-action">
              <Link to={`/courses/${course.id}/update`}>Update Course</Link>
            </button>
            <button className="course-action" onClick={() => this.deleteCourse(course.id)}>Delete Course</button>
          </div>
        );
      }

      return (
        <>
          {courseEditButtons}
          <h2>Course</h2>
          <h1>{course.title}</h1>
          <p>by {user.firstName} {user.lastName}</p>
          <p>Estimated time: {course.estimatedTime}</p>
          <ReactMarkdown source={course.description} />
          <ReactMarkdown source={course.materialsNeeded} />
        </>
      );
    }
	}
}

export default CourseDetail;
