import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
//import 'bootstrap/dist/css/bootstrap.css';
import "./Home.css";


export default function test() {
return (
	<div>
	<Dropdown>
		<Dropdown.Toggle>
		Open Menu
		</Dropdown.Toggle>
		<Dropdown.Menu>
		<Dropdown.Item href="#">
			Home Page
		</Dropdown.Item>
		<Dropdown.Item href="#">
			Settings
		</Dropdown.Item>
		<Dropdown.Item href="#">
			Logout
		</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
	</div>
);
}
