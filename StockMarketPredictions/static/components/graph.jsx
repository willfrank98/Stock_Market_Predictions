import React from "react";
import Container from '@material-ui/core/Container';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default class Graph extends React.Component {
	render() {
		return (
			<Container maxWidth="sm">
				<VictoryChart domainPadding={{x: [10, 10], y: 5}} theme={VictoryTheme.material} height={250} width={300}>
					<VictoryAxis
					// tickValues={[1, 2, 3, 4]}
					// tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
						fixLabelOverlap={true}
						style={{tickLabels: {fontSize: 10, padding: 10, angle: -30}}}
					/>
					<VictoryAxis
						dependentAxis
						// tickFormat specifies how ticks should be displayed
						tickFormat={(x) => (`${x / 1000}k`)}
						// tickFormat={(x) => ("$" + (x/1000).toString().substr(0, 4) + "k")}
						label="Closing Value ($)"
						style={{axisLabel: {fontSize: 12, padding: 39},
								tickLabels: {fontSize: 10, padding: 3}}}
					/>
					<VictoryLine	// Stock tracking line
						data={this.props.stock_data}
						x="date"
						y="value"
					/>
					<VictoryLine	// Prediction line
						data={this.props.prediction_data}
						style={{
							data: { stroke: this.props.prediction > 0 ? "#33691e" : "#b71c1c" },
						}}
						x="date"
						y="value"
					/>
				</VictoryChart>
			</Container>
		);
	}
}