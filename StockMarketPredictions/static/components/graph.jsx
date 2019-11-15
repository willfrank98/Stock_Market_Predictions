import React from "react";

export default class Graph extends React.Component {
	render() {
		return (
			<h4>Tracking last {this.props.days} days.</h4>
		);
	}
}