import React, { Component } from 'react';
import {
    Navigator,
    View,
    Image,
    AsyncStorage
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VideoPlayer from 'react-native-video-controls';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';

import colors from '../styles/colors';
import HomePage from './HomePage';
import ClassPage from './ClassPage';
import PlaylistPage from './PlaylistPage';
import InfoPage from './InfoPage';
import TabBar from './TabBar';

class PilatesApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            classData: {},
            basicsData: {},
            latestData: {}
        };
    }

    getPlaylists() {
        return fetch('https://pilates-playlist.herokuapp.com/playlists')
            .then((response) => { return response.json(); });
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.getPlaylists().then(data => {

            let classData = data.playlists.find(p => p.id === '4221859');
            let basicsData = data.playlists.find(p => p.id === '4221862');
            let latestData = data.playlists.find(p => p.id === '4221868');

            this.setState({
                loading: false,
                classData: classData,
                basicsData: basicsData,
                latestData: latestData
            });

        });
    }

    //<Image style={{resizeMode: 'contain'}} source={ require('../img/loading.gif') } />
    //</Spinner>

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <Spinner visible={this.state.loading} textContent='Preparing the studio...' textStyle={{color: colors.whiteSmoke}} overlayColor={colors.turquoise} />
                </View>
            )
        } else {
            return (
                <Navigator
                    initialRoute={{id: 'HomePage', name: 'Index'}}
                    renderScene={this.renderScene.bind(this)}
                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}/>
            );
        }
    }

    renderScene(route, navigator) {
        let routeId = route.id;
        switch (routeId) {
            case 'HomePage':
                Orientation.lockToPortrait();
                return (
                    <ScrollableTabView tabBarPosition='bottom' prerenderingSiblingsNumber={1} renderTabBar={ () => <TabBar /> } >
                        <HomePage tabLabel='ios-home-outline' key='home'/>
                        <ClassPage navigator={navigator} tabLabel='ios-school-outline' key='classes' title='Basics' data={this.state.classData}/>
                        <PlaylistPage navigator={navigator} tabLabel='ios-list-outline' key='assignments' title='Assignments' data={this.state.basicsData} />
                        <PlaylistPage navigator={navigator} tabLabel='ios-play-outline' key='videos' title='Videos' data={this.state.latestData}/>
                        <InfoPage navigator={navigator} tabLabel='ios-information-circle-outline' key='about' title='About 360 Pilates'/>
                    </ScrollableTabView>
                );
            case 'VideoPlayer':
                Orientation.unlockAllOrientations();
                return (
                    <VideoPlayer navigator={navigator}
                                 source={{uri: route.video.src}}
                                 title={route.video.title}
                                 videoStyle={{backgroundColor: '#000'}}
                                 controlTimeout={ 3000 }/>
                );
            default:
                console.warn('Unknown route', route, navigator);
        }
    }

}

export default PilatesApp;