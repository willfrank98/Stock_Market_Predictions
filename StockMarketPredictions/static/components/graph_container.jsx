import React from "react";
import Container from '@material-ui/core/Container';
import Graph from "./graph"
import { Button } from "@material-ui/core";

export default class GraphContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stock_data: new Array(10),
			predictions: new Array(10)
		};
	}

	reseed_db() {
		fetch("/seed-db")
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result);
				},
				(error) => {
					alert(error)
				}
			);
	}

	get_next_day() {
		fetch("/get-next-day")
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result);
				},
				(error) => {
					alert(error)
				}
			);
	}

	componentDidMount() {
		fetch("/get-graph-data/0")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						stock_data: result["stock_data"],
						predictions: result["predictions"]
					});
				},
				(error) => {
					alert(error)
				}
			);
	}

	render() {
		return (
			<Container maxWidth="md">
				<Button onClick={() => this.reseed_db()}>Reseed database</Button>
				<Button onClick={() => this.get_next_day()}>Get next day</Button>
				{[...Array(10).keys()].map((text, index) => (
					<div key={text}>
						<h4>Tracking the last {index + 1} days</h4>
						<Graph
							days={index + 1}
							stock_data={this.state.stock_data.slice(index, index + index + 1)}
							prediction_data={this.state.stock_data.slice(index, index + 10).map((obj) => ({ date: obj['date'], value: this.state.stock_data[index]['value'] }))}
							prediction={this.state.predictions[index]}
						/>
					</div>
				))}
			</Container>
		);
	}
}