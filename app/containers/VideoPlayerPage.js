import React from 'react';
import { connect } from 'react-redux';
import { navigateBack } from '../ducks/nav';
import { removeLocalVideo } from '../ducks/localData';

import VideoPlayer from '../components/videoPlayerScreen';

const mapStateToProps = (state, ownProps) => {
    const { video } = ownProps.navigation.state.params;

    return {
        video
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => dispatch(navigateBack()),
        onError: (id) => {
            dispatch(removeLocalVideo(id));
            dispatch(navigateBack());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
