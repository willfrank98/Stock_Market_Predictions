import React from "react";
import Container from '@material-ui/core/Container';
import Graph from "./graph"

export default class GraphContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stock_data: [
				{ date: "11-01-2019", value: 13000 },
				{ date: "11-02-2019", value: 16500 },
				{ date: "11-03-2019", value: 14250 },
				{ date: "11-04-2019", value: 19000 }
			],
			predictions: new Array(10)
		};
	}

	update_state_data(data) {

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
			)
	}

	render() {
		return (
			<Container maxWidth="md">
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