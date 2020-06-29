import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CourseForm from './CourseForm';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered">
          <h1>Create Course</h1>
          <CourseForm 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create"
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
    // this gets the signed in user
    const { authenticatedUser: user } = this.props.context;

    // this is the info for the new course
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
// todo userId
    // create a new course object
    const course = { title, description, estimatedTime, materialsNeeded, userId: user.id };
    console.log(course);

    // context.data.createCourse(course)
    //   .then(errors => {
    //     if (errors.length > 0) {
    //       this.setState({ errors })
    //     } else {
    //       console.log(course)
    //       
    //     }
    //   })
    //   // handle rejected promise: issue with endpoint, api down, network connectivity error
    //   .catch( err => {
    //     console.log(err);
    //     this.props.history.push('/error'); // push to history stack will redirect to error page
    //   });

  }

  cancel = () => {
    // go back to main page
    this.props.history.push('/');
  }
}
