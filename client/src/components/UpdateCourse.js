import React, { Component } from 'react';
import CourseForm from './CourseForm';

export default class UpdateCourse extends Component {
  // state = {
  //   title: '',
  //   description: '',
  //   estimatedTime: '',
  //   materialsNeeded: '',
  //   userId: '',
  //   errors: [],
  // }

  // componentDidMount() {
  //   this.setState({
  //     title: this.props.course.title,
  //     description: this.props.course.description,
  //     estimatedTime: this.props.course.estimatedTime,
  //     materialsNeeded: this.props.course.materialsNeeded,
  //     userId: this.props.course.userId
  //   })
  // }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      errors,
    } = this.props;

    return (
      <div className="bounds">
        <div className="grid-33 centered">
          <h1>Update Course</h1>
          <CourseForm 
            cancel={this.cancel}
            errors={errors}
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

    // this is the info for the new course
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // create a new course with current user id
    const course = { title, description, estimatedTime, materialsNeeded, userId: user.id };
    context.actions.createCourse(user.emailAddress, user.password, course)
      .then(data => {
        console.log(data)
        if (data.errors) {
          // validation errors
          this.setState({ errors: data.errors })
        } else {
          // course created successfully, go to newly created course page
          this.props.history.push(data.location)
        }
      })
      // handle rejected promise: issue with endpoint, api down, network connectivity error
      .catch( err => {
        console.log(err);
        this.props.history.push('/error'); // push to history stack will redirect to error page
      });
  }

  cancel = () => {
    // set editing to false
    console.log(this.props.value.match.params.id)
    this.props.cancelUpdate();
    this.props.value.location.goBack();
    // this.props.history.push({
    //   pathname: `/course/${this.props.value.match.params.id}`,
    //   state: { editing: false }});
  }
}
