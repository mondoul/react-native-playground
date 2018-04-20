import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import colors from '../styles/colors';
import Orientation from 'react-native-orientation';

export default class VideoPlayerScreen extends Component {

    componentDidMount() {
        Orientation.unlockAllOrientations();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }

    render() {
        const { onBack, onError } = this.props;
        const { params } = this.props.navigation.state;
        const video = params ? params.video : null;

        return (
            <VideoPlayer onBack={onBack}
                         source={{uri: video.src}}
                         title={video.title}
                         videoStyle={{backgroundColor: colors.black}}
                         controlTimeout={ 3000 }
                         onError={() => onError(video.id)}/>
        );
    }
}

VideoPlayerScreen.propTypes = {
    onBack: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
};