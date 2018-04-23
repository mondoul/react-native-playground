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
        const { onBack, onError, video } = this.props;

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
    onError: PropTypes.func.isRequired,
    video: PropTypes.shape({
        src: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
};