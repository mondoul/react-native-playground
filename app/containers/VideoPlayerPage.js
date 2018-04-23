import React from 'react';
import { connect } from 'react-redux';
import * as nav from '../ducks/nav';
import { removeLocalVideo } from '../ducks/localData';

import VideoPlayer from '../components/videoPlayerScreen';

const mapStateToProps = (state, ownProps) => {
    const { video } = nav.getNavigationParams(ownProps);

    return {
        video
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => dispatch(nav.navigateBack()),
        onError: (id) => {
            dispatch(removeLocalVideo(id));
            dispatch(nav.navigateBack());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
