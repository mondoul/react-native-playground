import React from 'react';
import { StackNavigator } from 'react-navigation';
import appTabNavigator from './tabNavigator';
import VideoPlayer from '../containers/VideoPlayerPage';

export default StackNavigator(
    {
        Main: { screen: appTabNavigator },
        VideoPlayer: {
            screen: VideoPlayer,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        mode: 'modal',
        headerMode: 'screen'
    }
);