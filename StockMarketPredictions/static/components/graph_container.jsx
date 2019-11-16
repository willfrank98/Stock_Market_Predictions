import React from "react";
import ReactDOM from "react-dom";
import Container from '@material-ui/core/Container';
import Graph from "./graph"

export default class GraphContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	}

	get_data() {
		$.ajax({
			url: "/get-graph-data",
			method: "GET",
		}).done(function (result) {
			this.setState({data: result});
		}).fail(function (jqXHR, textStatus, errorThrown) {
	
		});
	}

	render() {
		var stock_data = [
			{ date: "11-01-2019", value: 13000 },
			{ date: "11-02-2019", value: 16500 },
			{ date: "11-03-2019", value: 14250 },
			{ date: "11-04-2019", value: 19000 }
		]

		var prediction_data = [
			{ date: "11-01-2019", value: 12345 },
			{ date: "11-02-2019", value: 12345 },
			{ date: "11-03-2019", value: 12345 },
			{ date: "11-04-2019", value: 12345 }
		]
		return (
				<Container maxWidth="sm">
					{[...Array(10).keys()].map((text, index) => (
						<Graph days={index + 1} key={text} stock_data={stock_data} prediction_data={prediction_data} />
					))}
				</Container>
		);
	}
}