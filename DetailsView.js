// SimpleRedditApp/DetailsView.js
// Created: July 13, 2017
// Created by: Chazz Malott

// This is the details screen, it will take the title and permalink and present the image, upvotes,
// a link to the page and all the comments in a listview

import React from 'react';
import { ActivityIndicator, Image, Linking, ListView, Text, View } from 'react-native';
import { styles } from './Styles.js';

var RedditPrefix = 'https://www.reddit.com/';

export class DetailsView extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title,
	});

	constructor(props) {
		super(props);
		this.state = {
			isLoading : true,
			// use the permalink passed in to form the JSON request
			JSONRequest : RedditPrefix + props.navigation.state.params.permalink + '.json',
		}
	}

// keep JSON requests in componentDidMount and use then handlers
	componentDidMount() {
		return fetch(this.state.JSONRequest)
		.then((response) => response.json())
		.then((responseJson) => {;
			let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({
				isLoading: false,
				dataSource: ds.cloneWithRows(responseJson[1].data.children),
				threadData: responseJson[0].data.children[0].data,
			},);
		})
		.catch((error) => {
			console.error(error);
		});
	}

	render() {
		const params = this.props.navigation.state.params;
		if (this.state.isLoading) {
			return (
				<View style={styles.masterListView}>
					<ActivityIndicator style={styles.centerItem}/>
				</View>
			);
		}	return (
			// render the image, upvotes, link to the page and all the comments in a list view
			// this will need to look pretty in terms of the UI


			// todo: add handling in case the thumbnail returns an empty string, this can happen on occasion
			<View style={styles.detailsView}>
				<Image source={{uri: this.state.threadData.thumbnail}}
					style={{width:100, height:100}}/>
				<Text style={styles.upvotes}>Upvotes: {this.state.threadData.ups}</Text>
				<Text style={{color: 'blue'}}
					onPress={() => Linking.openURL(RedditPrefix+this.state.threadData.permalink)}>Original Post</Text>
				<ListView
					dataSource={this.state.dataSource}
					contentContainerStyle={styles.masterListItems}
					renderRow={(rowData) =>
						<View>
							<Text style={styles.detailsText}>{rowData.data.body}</Text>
						</View>
					}
				/>
			</View>
		);
	}
}