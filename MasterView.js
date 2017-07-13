// SimpleRedditApp/DetailsView.js
// Created: July 13, 2017
// Created by: Chazz Malott

// Opening screen for the application, lists what reddit returns via JSON
// which is the first 25 posts, all are selectable

import React from 'react';
import { ActivityIndicator, ListView, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './Styles.js';

var JSONrequest = 'https://www.reddit.com/.json';

export class MasterView extends React.Component {
	static navigationOptions = {
		title: 'Simple Reddit App',
	};

	constructor(props) {
		super(props);
		this.state = {
			// variable to know if we should display a waiting icon or not
			isLoading : true
		}
	}

// All tutorials say it's best to include JSON calls in componentDidMount
// this creates a JSON request, the then statements are handlers for asynchronous calls
// when we call setState, react will rerender if need be
// todo: The JSON requests should be in a seperate file
	componentDidMount() {
		return fetch(JSONrequest)
			.then((response) => response.json())
			.then((responseJson) => {
				let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				this.setState({
					isLoading : false,
					dataSource: ds.cloneWithRows(responseJson.data.children),
				},);
			})
			.catch((error) => {
				console.error(error);
			});
	}

// Handles navigation to the details page, sets title and permalink as properties
	onNavigate(title, permalink) {
		const navigate = this.props.navigation.navigate;
		navigate('DetailsView', { title : title , permalink : permalink });
	}

	render() {
		// displays loading icon if it hasn't finished parsing the JSON yet
		if (this.state.isLoading) {
			return (
				<View style={styles.masterListView}>
					<ActivityIndicator style={styles.centerItem}/>
				</View>
			);
		}
		return (
			//The listview will pull information from the dataSource then call renderRow passing in the data for each row
			//since the dataSource is an array, each element will be passed to each row
			//Each row is a touchable that will navigate to a details screen passing in the title and permalink
			<View style={styles.masterListView}>
				<ListView
					dataSource={this.state.dataSource}
					contentContainerStyle={styles.masterListItems}
					renderRow={(rowData) =>
						<TouchableHighlight onPress={() => this.onNavigate(rowData.data.title, rowData.data.permalink)}>
							<View>
								<Text style={styles.mainScreenText}>{rowData.data.title} - r/{rowData.data.subreddit}</Text>
							</View>
						</TouchableHighlight>
					}
				/>
			</View>
		);
	}
}