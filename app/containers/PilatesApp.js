import React, { Component } from 'react';
import {
    Navigator,
    View,
    Image,
    Text,
    AsyncStorage
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VideoPlayer from 'react-native-video-controls';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';

import colors from '../styles/colors';
import HomePage from '../components/HomePage';
import ClassPage from '../containers/ClassPage';
import PlaylistPage from '../components/PlaylistPage';
import InfoPage from '../components/InfoPage';
import TabBar from '../components/TabBar';
import { connect } from 'react-redux';
import { fetchPlaylists, fetchLocalVideos } from '../actions';

class PilatesApp extends Component {

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.dispatch(fetchLocalVideos());
        this.props.dispatch(fetchPlaylists());
    }

    render() {
        let { isFetching, isError } = this.props;
        console.log('Fetching', isFetching);

        if (isError) {
            return (
                <View style={{flex: 1}}>
                    <Spinner visible={isError} textStyle={{color: colors.white}} overlayColor={colors.turquoise} >
                        <Text>There was a error initializing the application data. Please try again.</Text>
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
        let { classes, basics, latest } = this.props;
        switch (routeId) {
            case 'HomePage':
                Orientation.lockToPortrait();
                return (
                    <ScrollableTabView tabBarPosition='bottom' prerenderingSiblingsNumber={1} renderTabBar={ () => <TabBar /> } >
                        <HomePage tabLabel='ios-home-outline' key='home'/>
                        <ClassPage navigator={navigator} tabLabel='ios-school-outline' key='classes' title='Basics' data={classes} />
                        <PlaylistPage navigator={navigator} tabLabel='ios-list-outline' key='assignments' title='Assignments' data={basics} />
                        <PlaylistPage navigator={navigator} tabLabel='ios-play-outline' key='videos' title='Videos' data={latest} />
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

PilatesApp.propTypes = {
    dispatch: React.PropTypes.func,
    classes: React.PropTypes.object,
    basics: React.PropTypes.object,
    latest: React.PropTypes.object,
    isError: React.PropTypes.bool,
    isFetching: React.PropTypes.bool
};

const mapStateToProps = (state) => {
    let { classes, basics, latest, isFetching, isError } = state.playlistData;
    return {
        classes, basics, latest, isFetching, isError
    };
};

export default connect(mapStateToProps)(PilatesApp);