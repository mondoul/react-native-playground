import React from 'react';
import { StackNavigator } from 'react-navigation';
import appTabNavigator from './tabNavigator';
import InfoPage from '../containers/InfoPage';

export default StackNavigator(
    {
        Main: { screen: appTabNavigator },
        VideoPlayer: { screen: InfoPage }
    },
    {
        mode: 'modal',
        headerMode: 'screen'
    }
);