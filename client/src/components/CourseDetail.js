import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import withContext from '../Context';
import UpdateCourse from './UpdateCourse';

const ReactMarkdown = require('react-markdown');
const UpdateCourseWithContext = withContext(UpdateCourse);

class CourseDetail extends Component {
	state = {
    loading: true,
    editing: false,
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
  
  handleEditing = () => {
    this.setState( prevState => ({ editing: !prevState.editing}) );
  }

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

      if (!this.state.editing) {
        return (
          <>
            {/* course action buttons will go here */}
            <button  className="course-action">
              <Link to={`/courses/${course.id}/update`} onClick={this.handleEditing}>
                Update Course
              </Link>
            </button>
            <h2>Course</h2>
            <h1>{course.title}</h1>
            <p>by {user.firstName} {user.lastName}</p>
            <ReactMarkdown source={course.description} />
            <ReactMarkdown source={course.materialsNeeded} />
          </>
        );
      } else {
        return (
          <>
            <Route 
              path={`/courses/${course.id}/update`} 
              render={() => <UpdateCourseWithContext
                course={course}
                cancelUpdate={this.handleEditing}
              />}
            />
          </>
        );
      }
    }
	}
}

export default CourseDetail;
