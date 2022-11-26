import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
//import 'boo/Search/Gettstrap/dist/css/bootstrap.css';
import "./Home.css";
import { isArray } from 'lodash';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
 
export default function Dropdown1 ({filter, items}){
return (
	<div>
	<Dropdown>
	<Dropdown.Toggle>
		{filter}
	</Dropdown.Toggle>
		<Dropdown.Menu>
		{items.map(item => <Dropdown.Item>
			{item}
		</Dropdown.Item>)}
		
		</Dropdown.Menu>
	</Dropdown>
	</div>
);
}