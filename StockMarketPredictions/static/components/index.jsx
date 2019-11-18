import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { DiscreteColorLegend } from 'react-vis';
import Nav_n_Drawer from "./nav_n_drawer"
import GraphContainer from "./graph_container"

class Index extends React.Component {
	render() {
		const ITEMS = [
			{title: 'Closing Value', color: "#3f51b5"},
  			{title: 'Predicted to Increase', color: '#388e3c'},
  			{title: 'Predicted to Decrease', color: '#b71c1c'},
		];

		return (
			<React.Fragment>
				<CssBaseline />
				<Nav_n_Drawer />
				<Grid
					container
					direction="row"
				>
					<Grid item xs={1}></Grid>
					<Grid item xs={6}>
						<h1>Stock Market Prediction Tracker</h1>
						<h3>A website built to track the ongoing accuracy of a neural network which predicts whether the Dow Jones Industrial Average 
							will increase or decrease in the next 10 days. Read more about it on the <a href="/about">About Page</a>.</h3>
					</Grid>
					<Grid item xs={1}></Grid>
				</Grid>
				<Grid 
					item container 
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
				>
					<Grid item xs={1}></Grid>
					<Grid item>
						<h4>Legend</h4>
						<DiscreteColorLegend height={150} width={300} items={ITEMS} />
					</Grid>
					<Grid item xs={1}></Grid>
					<Grid item>
						<h4>Stats</h4>
						<p>Trained On: 1/29/1985 - 1/14/2019</p>
						<p>Evaluated Since: 1/14/2019</p>
						<p>Total Accuracy: 100%</p>
					</Grid>
					<Grid item xs={1}></Grid>
				</Grid>

				<GraphContainer />
			</React.Fragment>
		);
	}
}

ReactDOM.render(
	<Index />,
	document.getElementById("content")
);