import React from "react";
import Grid from '@material-ui/core/Grid';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, LineMarkSeries } from 'react-vis';

export default class Graph extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		stock_data: new Array(10),
	// 		prediction_data: new Array(10),
	// 		predictions: new Array(10),			
	// 		date_list: new Array(10),	
	// 	};
	// }

	render() {
		var yMin = 20000, yMax = 30000;
		if (this.props.stock_data !== undefined) {
			yMin = this.props.stock_data[0]['y'] - 500;
			yMax = this.props.stock_data[0]['y'] + 500;
		}
		return (
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="flex-start"
			>
				<Grid item>
					<h4>Tracking the last {this.props.days} days</h4>
				</Grid>
				<Grid item>
					<XYPlot 
						height={400} 
						width={600} 
						margin={{ left: 80, right: 10, top: 10, bottom: 80 }}
						yDomain={[yMin, yMax]}
					>
						<VerticalGridLines />
						<HorizontalGridLines />
						<XAxis
							tickFormat={(x, i) => (this.props.date_list[i])}
							tickLabelAngle={-45}
						/>
						<YAxis
							tickFormat={(x) => (`${x / 1000}k`)}
						/>
						<LineMarkSeries data={this.props.stock_data} color="#3f51b5" />
						<LineSeries data={this.props.prediction_data} color={this.props.prediction > 0 ? "#3f51b5" : "b71c1c"} />
					</XYPlot>
				</Grid>
			</Grid>
		);
	}
}