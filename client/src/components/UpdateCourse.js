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
      document.title = this.state.course.title
      } else{
        // 500
      }
		} catch (error) {
			console.log(error);
		}
  };

  render() {
    if (this.state.loading) {
      return <p>loading...</p>
    } else if (this.state.course === 404) {
      return <p>Course not found</p> // todo
    } else if (this.state.userId !== this.props.context.authenticatedUser.id) {
      return <p>You are not authorized</p> // todo
    } else {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      } = this.state;

      return (
        <div className="bounds">
          <div className="grid-33 centered">
            <h1>Update Course</h1>
            <CourseForm 
              cancel={this.cancel}
              errors={this.state.errors}
              submit={this.submit}
              submitButtonText="Update"
              elements={() => (
                <>
                  <label htmlFor="title">Title</label>
                  <input 
                    id="title" 
                    name="title" 
                    type="text"
                    value={title} 
                    onChange={this.change} 
                    placeholder="Course title"
                    autoComplete="" />
                  <label htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={description} 
                    onChange={this.change} 
                    placeholder="Course description..."
                    autoComplete="" />
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="text"
                    value={estimatedTime} 
                    onChange={this.change} 
                    placeholder="Estimated time"
                    autoComplete="" />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    value={materialsNeeded} 
                    onChange={this.change} 
                    placeholder="Materials needed..."
                    autoComplete="" />
                </>
              )} />
          </div>
        </div>
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

    context.actions.updateCourse(user.emailAddress, user.password, course)
      .then(data => {
        console.log(data)
        if (data.errors) {
          // validation errors
          this.setState({ errors: data.errors })
        } else {
          // course updated successfully, go to newly created course page
          this.props.history.push(`/courses/${id}`);
        }
      })
      // handle rejected promise: issue with endpoint, api down, network connectivity error
      .catch( err => {
        console.log(err);
        this.props.history.push('/error'); // push to history stack will redirect to error page
      });
  }

  cancel = () => {
    this.props.history.goBack();
  }
}
