// SimpleRedditApp/App.js
// Created: July 13, 2017
// Created by: Chazz Malott

// This file simply imports the two different view classes
// and creates a stack navigator, allowing the two classes
// to navigate between eachother

import { StackNavigator } from 'react-navigation';
import { MasterView } from './MasterView.js';
import { DetailsView } from './DetailsView.js';

export default App = StackNavigator({
  MasterView : {screen : MasterView},
  DetailsView : {screen : DetailsView},
})
