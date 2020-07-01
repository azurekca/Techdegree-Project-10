import config from './config';

// methods for fetching data from REST API
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  readResponse(response, errorMessage) {
    
    switch (response.status) {
      // OK
      case 200: return response.json().then(data => data);
      // Created
      case 201: return { location: response.headers.get('location') }
      // Success, no content
      case 204: return 'success';
      // Bad request
      case 400: return response.json().then(data => data.errors );
      // Not authorized
      case 401: return 401;
      // Forbidden
      case 403: return 403;
      // Not found
      case 404: return 404;
      // Server error
      case 500: return 500;
      default:
        throw new Error(errorMessage);
    }
  }

  /*** USER DATA ***/
  async getUser(username, password) {
    const response = await this.api('/users', 'GET', null, true, { username, password });
    // possible responses 200, 401, 500
    return this.readResponse(response, `error in getUser: ${username}`);
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    // possible responses 201, 400, 500
    return this.readResponse(response, `error in createUser: ${user}`);
  }
  
  /*** COURSE DATA ***/
  getCourses = async () => {
    const response = await this.api('/courses');
    // possible responses 200, 500
    return this.readResponse(response, 'error in getCourses');
  }

  getCourse = async (id) => {
    const response = await this.api('/courses/' + id);
    // possible responses 200, 404, 500
    return this.readResponse(response, `error in getCourse, id: ${id}`);
  }

  postCourse = async (username, password, course) => {
    const response = await this.api('/courses/', 'POST', course, true, { username, password });
    // possible responses 201, 400, 401, 500
    return this.readResponse(response, `error in postCourse, data: ${course}`);
  }

  putCourse = async (username, password, course) => {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { username, password });
    // possible responses 204, 400, 401, 403, 500
    return this.readResponse(response, `error in putCourse, data: ${course}`);
  }

  deleteCourse = async (id) => {
    const response = await this.api('/courses/' + id);
    // possible responses 204, 401, 403, 500
    return this.readResponse(response, `error in getCourse, id: ${id}`);
  }
}