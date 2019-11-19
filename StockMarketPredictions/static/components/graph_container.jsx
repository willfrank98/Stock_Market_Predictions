import React from "react";
import Container from '@material-ui/core/Container';
import Graph from "./graph"
import { Button } from "@material-ui/core";

export default class GraphContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stock_data: new Array(10),
			prediction_data: new Array(10),
			predictions: new Array(10),			
			date_list: new Array(10),	
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
						prediction_data: result["prediction_data"],
						predictions: result["predictions"],
						date_list: result["date_list"],
					});
				},
				(error) => {
					alert(error)
				}
			);
	}

	render() {
		return (
			<Container maxWidth="lg">
				{[...Array(10).keys()].map((text, index) => (
					<Graph
						key={text}
						days={index + 1}
						date_list={this.state.date_list[index]}
						stock_data={this.state.stock_data[index]}
						prediction_data={this.state.prediction_data[index]}
						prediction={this.state.predictions[index]}
					/>
				))}
			</Container>
		);
	}
}