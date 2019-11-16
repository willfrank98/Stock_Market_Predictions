import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default class Graph extends React.Component {
	render() {
		return (
			<div>
				<h4>Tracking last {this.props.days} days.</h4>
				<VictoryChart domainPadding={20} theme={VictoryTheme.grayscale}>
					<VictoryAxis
					// tickValues={[1, 2, 3, 4]}
					// tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
					/>
					<VictoryAxis
						dependentAxis
						// tickFormat specifies how ticks should be displayed
						tickFormat={(x) => (`$${x / 1000}k`)}
					/>
					<VictoryLine	// Stock tracking line
						data={this.props.stock_data}
						x="date"
						y="value"
					/>
					<VictoryLine	// Prediction line
						data={this.props.prediction_data}
						style={{
							data: { stroke: "#c43a31" },
							parent: { border: "1px solid #ccc" }
						}}
						x="date"
						y="value"
					/>
				</VictoryChart>
			</div>
		);
	}
}