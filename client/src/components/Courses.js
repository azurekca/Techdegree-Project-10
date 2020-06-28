import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Test extends Component {
	state = {
		courses : []
	};

	componentDidMount() {
		this.fetchItems();
	}

	fetchItems = async () => {
		try {
			const data = await fetch('http://localhost:5000/api/courses');
			const courses = await data.json();
			console.log(courses);
			this.setState({ courses });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<div>
				<h1>Testing my api</h1>
				<ul>{this.state.courses.map(item => <li key={item.id}>{item.title}</li>)}</ul>
			</div>
		);
	}
}

export default Test;
