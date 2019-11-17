import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';

export default class Graph extends React.Component {
	render() {
		const ITEMS = [
			'Closing Values',
			'Prediction',
		];

		let legend;
		if (this.props.days == 1) {
			legend = <DiscreteColorLegend height={100} width={200} items={ITEMS} />
		}

		return (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="flex-start"
			>
				<Grid item xs={8}>
					<XYPlot height={300} width={500} margin={{ left: 80, right: 10, top: 10, bottom: 80 }}>
						<VerticalGridLines />
						<HorizontalGridLines />
						<XAxis
							tickFormat={(x, i) => (this.props.date_list[i])}
							tickLabelAngle={-45}
						/>
						<YAxis
							tickFormat={(x) => (`${x / 1000}k`)}
						/>
						<LineSeries data={this.props.stock_data} />
						<LineSeries data={this.props.prediction_data} />
					</XYPlot>
				</Grid>
				<Grid item xs>
					{legend}
				</Grid>
			</Grid>
		);
	}
}