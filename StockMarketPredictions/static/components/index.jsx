import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Nav_n_Drawer from "./nav_n_drawer"
import GraphContainer from "./graph_container"

class Index extends React.Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<Nav_n_Drawer />

				<GraphContainer />
			</React.Fragment>
		);
	}
}

ReactDOM.render(
	<Index />,
	document.getElementById("content")
);