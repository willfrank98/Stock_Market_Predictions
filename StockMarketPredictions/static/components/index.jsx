import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Graph from "./graph"
import Nav_n_Drawer from "./nav_n_drawer"

class Index extends React.Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<Nav_n_Drawer />

				<Container maxWidth="md">
					{[...Array(10).keys()].map((text, index) => (
						<Graph days={index + 1} key={text}/>
					))}
				</Container>
			</React.Fragment>
		);
	}
}

ReactDOM.render(
	<Index />,
	document.getElementById("content")
);