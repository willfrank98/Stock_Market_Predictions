import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

export default class FreeDrawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	render() {
		return (
			<div>
				<Button onClick={() => this.setState({show: true})}>Open Left</Button>
				<Drawer open={this.state.show} onClose={() => this.setState({show: false})}>
					<div
						// className={classes.list}
						role="presentation"
						onClick={() => this.setState({show: false})}
						onKeyDown={() => this.setState({show: false})}
					>
						<List>
							{/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
								<ListItem button key={text}>
									<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							))} */}
							<ListItem button key="Home">
								<ListItemIcon><HomeIcon /></ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem>
						</List>
					</div>
				</Drawer>
			</div >
		);
	}

}
