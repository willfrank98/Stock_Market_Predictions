import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

export default class Nav_n_Drawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	openDrawer() {
		this.setState({show: true});
	}

	closeDrawer() {
		this.setState({show: false});
	}

	render() {
		return (
			<div >
				<NavBar openDrawer={() => this.openDrawer()} />
				<FreeDrawer closeDrawer={() => this.closeDrawer()} show={this.state.show} />
			</div>
		)
	};
}

class NavBar extends React.Component {
	render() {
		return (
			<div >
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.props.openDrawer()}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" >
							SMPT
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
	};
}

class FreeDrawer extends React.Component {
	render() {
		return (
			<div>
				<Drawer open={this.props.show} onClose={() => this.props.closeDrawer()}>
					<div
						role="presentation"
						onClick={() => this.props.closeDrawer()}
						onKeyDown={() => this.props.closeDrawer()}
					>
						<List>
							<Link href="/" underline="none" color="inherit">
								<ListItem button key="Home">
									<ListItemIcon><HomeIcon /></ListItemIcon>
									<ListItemText primary="Home" />
								</ListItem>
							</Link>
							<Link href="/about" underline="none" color="inherit">
								<ListItem button key="About">
									<ListItemIcon><InfoIcon /></ListItemIcon>
									<ListItemText primary="About" />
								</ListItem>
							</Link>
						</List>
					</div>
				</Drawer>
			</div >
		);
	}

}