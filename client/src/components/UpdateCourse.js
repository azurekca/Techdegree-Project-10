import React, { Component } from 'react';
import CourseForm from './CourseForm';

export default class UpdateCourse extends Component {
  state = {
    loading: true,
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  }

	componentDidMount() {
    // set page title
    document.title = 'Courses | Update';
    this.fetchCourse();
	}

	fetchCourse = async () => {
    // this gives access to the Data methods for talking to the api defined in Data.js and the actions defined in Context.js
    const { context } = this.props;
    const requestedCourseId = this.props.match.params.id;
    
		try {
      // get course information from db
      const course = await context.data.getCourse(requestedCourseId);
      // check if course is owned by logged in user
      if (course.userId !== this.props.context.authenticatedUser.id) {
        this.props.history.push({
          pathname: '/forbidden',
          state: {error: `You are not authorized to edit course: ${course.title}`}
        });
      }
      // update state
      this.setState({ 
        loading: false, 
        id: course.id, 
        title: course.title, 
        description: course.description, 
        estimatedTime: course.estimatedTime, 
        materialsNeeded: course.materialsNeeded, 
        userId: course.userId
        });

        // set page title
        document.title = `Courses | Update | ${this.state.title}`;

    } catch (error) {
      console.log(error);
      if (error === 404) {
        this.props.history.push({
            pathname: '/notfound',
            state: {error: `The requested course id=${requestedCourseId} was not found.`}
          });
      } else {
        this.props.history.push('/error'); // push to history stack will redirect to error page
      }
    }
  };

  render() {
    if (this.state.loading) {
      return <p>loading...</p>
    } else {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      } = this.state;

      return (
        <>
          <h1>Update Course</h1>
          <CourseForm
            change={this.change}
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Update"
            title={title}
            description={description}
            estimatedTime={estimatedTime}
            materialsNeeded={materialsNeeded}
          />
        </>
      );
    }     
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
         [name]: value 
      };
    });
  }

  submit = () => {
    // this gets the signed in user and the data methods
    const { context } = this.props;
    const user = context.authenticatedUser

    const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId
      } = this.state;

    // create a new course with current user id
    const course = { id, title, description, estimatedTime, materialsNeeded, userId };

    context.data.updateCourse(user.emailAddress, user.password, course)
      .then(data => {
        if (data.errors) {
          // validation errors
          const valErrors = context.actions.parseValidationErrors(data.errors);
          this.setState({ errors: valErrors });
        } else {
          // course updated successfully, go to course detail page
          this.props.history.push(`/courses/${id}`);
        }
      })
      // handle errors and rejected promise: issue with endpoint, api down, network connectivity error
      .catch( error => {
        console.log(error);
        this.props.history.push('/error'); // push to history stack will redirect to error page
      });
  }

  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  }
}
