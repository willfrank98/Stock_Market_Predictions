import React from "react";
import ReactDOM from "react-dom";
// import Navbar from "./navbar";
import Graph from "./graph"
// import FreeDrawer from "./drawer"
import Nav_n_Drawer from "./nav_n_drawer"

class Index extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Nav_n_Drawer />

				<Graph days="1"/>
			</React.Fragment>
		);
	}
}

ReactDOM.render(
	<Index />,
	document.getElementById("content")
);