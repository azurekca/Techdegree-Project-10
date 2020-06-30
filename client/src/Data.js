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

  /*** USER DATA ***/
  async getUser(username, password) {
    const response = await this.api('/users', 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      // not authorized
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error(`error in Data.js: createUser ${user}`);
    }
  }
  
  /*** COURSE DATA ***/
  getCourses = async () => {
    const response = await this.api('/courses');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 500) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  getCourse = async (id) => {
    const response = await this.api('/courses/' + id);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return 404;
    }
    else if (response.status === 500) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  postCourse = async (username, password, course) => {
    const response = await this.api('/courses/', 'POST', course, true, { username, password });
    if (response.status === 201) {
      // success, return path of new course
      const data = {
        location: response.headers.get('location')
      }
      return data; 
    }
    else if (response.status === 400) {
      // bad request
      return response.json().then(data => {
        console.log(data.errors)
        return data;
      });
    }
    else if (response.status === 401) {
      // not authorized
      return 401;
    }
    else if (response.status === 500) {
      return null;
    }
    else {
      throw new Error();
    }
  }
}