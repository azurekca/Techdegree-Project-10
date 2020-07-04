import React, { Component } from 'react';

const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {
	state = {
    loading: true,
    course : {}
	};

	componentDidMount() {
    // set page title
    document.title = 'Courses | Detail';
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
      document.title = `Courses | Detail | ${this.state.course.title}`;
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
    // todo add in alert to confirm deletion
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
          <div className="container-buttons">
            <button onClick={() => this.props.history.push(`/courses/${course.id}/update`)}>
              Update Course
            </button>
            <button className="button-bad-action" onClick={() => this.deleteCourse(course.id)}>Delete Course</button>
            <button className="button-nav" onClick={() => this.props.history.push('/')}>Return to List</button>
          </div>
        );
      } else {
        courseEditButtons = (
          <div className="container-buttons">
            <button className="button-nav" onClick={() => this.props.history.push('/')}>Return to List</button>
          </div>
        );
      }

      return (
        <>
          {courseEditButtons}
          <div className="container-grid-course">
            <div className="course-title">
              <h2>Course</h2>
              <h1>{course.title}</h1>
              <h3>by {user.firstName} {user.lastName}</h3>
            </div>
            <div className="course-description">
              <h2>Description</h2>
              <ReactMarkdown source={course.description} />
            </div>
            <div className="course-time">
              <h2>Estimated Time</h2>
              <p>{course.estimatedTime}</p>
            </div>
            <div className="course-materials">
              <h2>Materials Needed</h2>
              <ReactMarkdown source={course.materialsNeeded} />
            </div>
          </div>
        </>
      );
    }
	}
}

export default CourseDetail;
