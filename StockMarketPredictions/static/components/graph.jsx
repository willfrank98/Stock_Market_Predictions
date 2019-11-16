import React from "react";
import Container from '@material-ui/core/Container';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default class Graph extends React.Component {
	render() {
		return (
			<Container maxWidth="sm">
				<VictoryChart 
					domainPadding={{x: [10, 10], y: 5}} 
					theme={VictoryTheme.material} 
					height={250} 
					width={300}
					domain={{ y: [23000, 26000] }}
					// padding={{ left: 200, top: 0, right: 0, bottom: 200 }}
				>
					<VictoryAxis
						fixLabelOverlap={true}
						style={{tickLabels: {fontSize: 10, padding: 10, angle: -30}}}

					/>
					<VictoryAxis
						dependentAxis
						tickFormat={(x) => (`${x / 1000}k`)}
						// label="Closing Value ($)"
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