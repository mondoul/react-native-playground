import React, { Component } from 'react';
import {
    Navigator,
    View,
    Image,
    Text,
    AsyncStorage,
    NetInfo
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VideoPlayer from 'react-native-video-controls';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';

import colors from '../styles/colors';
import HomePage from '../components/HomePage';
import ClassPage from './ClassPage';
import PlaylistPage from './PlaylistPage';
import InfoPage from '../components/InfoPage';
import TabBar from '../components/TabBar';
import { connect } from 'react-redux';
import { fetchPlaylists, fetchLocalVideos, checkConnectivityStatus, connectionStatus } from '../actions';

class PilatesApp extends Component {

    componentDidMount() {
        let { dispatch } = this.props;

        Orientation.lockToPortrait();

        dispatch(checkConnectivityStatus());
        dispatch(fetchLocalVideos());
        dispatch(fetchPlaylists());

        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectionInfoChange
        );

    }

    componentWillUnmount() {
        console.log('Unmounting...');
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectionInfoChange
        );
    }

    _handleConnectionInfoChange = (isConnected) => {
        this.props.dispatch(connectionStatus(isConnected));
    };

    render() {
        let { isFetching, isError } = this.props;

        if (isError) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner visible={isError} textStyle={{color: colors.white}} overlayColor={colors.turquoise} >
                        <Text style={[styles.heavyFont, {color: colors.white}]}>There was a error initializing the application data. Please try again.</Text>
                    </Spinner>
                </View>
            )
        } else if (isFetching) {
            return (
                <View style={{flex: 1}}>
                    <Spinner visible={isFetching} textContent='Preparing the studio...' textStyle={{color: colors.white}} overlayColor={colors.turquoise} />
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
        let { orientation, exercises, sequences } = this.props;
        switch (routeId) {
            case 'HomePage':
                Orientation.lockToPortrait();
                return (
                    <ScrollableTabView tabBarPosition='bottom' prerenderingSiblingsNumber={1} renderTabBar={ () => <TabBar /> } >
                        <HomePage tabLabel='home' key='home'/>
                        <ClassPage navigator={navigator} tabLabel='compass' key='orientation' title='Orientation' data={orientation} category='orientation'/>
                        <PlaylistPage navigator={navigator} tabLabel='list-thumbnails' key='exercises' title='Exercises' data={exercises} category='exercises' />
                        <PlaylistPage navigator={navigator} tabLabel='play-circle' key='sequences' title='Sequences' data={sequences} category='sequences' />
                        <InfoPage navigator={navigator} tabLabel='info' key='about' title='About 360° Pilates'/>
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

PilatesApp.propTypes = {
    dispatch: React.PropTypes.func,
    orientation: React.PropTypes.object,
    exercises: React.PropTypes.object,
    sequences: React.PropTypes.object,
    isError: React.PropTypes.bool,
    isFetching: React.PropTypes.bool
};

const mapStateToProps = (state) => {
    let { orientation, exercises, sequences, isFetching, isError } = state.playlistData;
    return {
        orientation, exercises, sequences, isFetching, isError
    };
};

export default connect(mapStateToProps)(PilatesApp);