import React, { Component } from 'react';
import {
    Navigator
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VideoPlayer from 'react-native-video-controls';

import HomePage from './HomePage';
import ClassPage from './ClassPage';
import PlaylistPage from './PlaylistPage';
import InfoPage from './InfoPage';
import TabBar from './TabBar';
import data from '../../data';

class PilatesApp extends Component {
    render() {
        //
        return (
            <Navigator
                initialRoute={{id: 'HomePage', name: 'Index'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }} />
        );
    }

    renderScene(route, navigator) {
        let routeId = route.id;
        switch (routeId) {
            case 'HomePage':
                return (
                    <ScrollableTabView tabBarPosition='bottom' renderTabBar={ () => <TabBar /> } >
                        <HomePage tabLabel='home' key='home'/>
                        <ClassPage navigator={navigator} tabLabel='class' key='classes' title='Basics' data={data.class}/>
                        <PlaylistPage navigator={navigator} tabLabel='assignment' key='assignments' title='Assignments' data={data.assignments} />
                        <PlaylistPage navigator={navigator} tabLabel='airline-seat-recline-extra' key='videos' title='Videos' data={data.latest}/>
                        <InfoPage navigator={navigator} tabLabel='info-outline' key='about' title='About 360 Pilates'/>
                    </ScrollableTabView>
                );
            case 'VideoPlayer':
                return (
                    <VideoPlayer navigator={navigator}
                                 source={{uri: route.video.src}}
                                 title={route.video.title}
                                 controlTimeout={ 3000 }/>
                );
            default:
                console.warn('Unknown route', route, navigator);
        }
    }

}

export default PilatesApp;