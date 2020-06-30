import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import PrivateRoute from './PrivateRoute';

// import withContext and configure components to use it
import withContext from './Context';
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default () => (
  <BrowserRouter>
    <HeaderWithContext />
    <main>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        {/* will be a private route with additional check for ownership */}
        <Route path={`/courses/:id/update`} component={UpdateCourseWithContext} />
      </Switch>
    </main>
  </BrowserRouter>
);