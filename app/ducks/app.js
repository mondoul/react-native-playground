import { NetInfo } from 'react-native';
import Orientation from 'react-native-orientation';
import { fetchPlaylists } from './playlistData';
import { fetchLocalVideos } from './localData';

// Actions
const CONNECTION_STATUS = 'CONNECTION_STATUS';

// Reducer
export default (state = {
    isOnline: true
}, action) => {
    switch(action.type) {
        case CONNECTION_STATUS:
            return Object.assign({}, state, {
                isOnline: action.isOnline
            });
        default:
            return state;
    }
};

const connectionStatus = (isOnline) => {
    return {
        type: CONNECTION_STATUS,
        isOnline
    }
};

export const initializeApp = () => {
    return (dispatch) => {
        Orientation.lockToPortrait();

        // this is the weirdest thing...
        // https://github.com/facebook/react-native/issues/8615
        NetInfo.isConnected.fetch().then(() => {
            NetInfo.isConnected.fetch().then(isOnline => {
                console.log('isOnline', isOnline);
                dispatch(connectionStatus(isOnline));
            });
        });

        NetInfo.addEventListener('connectionChange', connectionChangeHandler);

        // initialize data
        dispatch(fetchLocalVideos());
        dispatch(fetchPlaylists());
    }
};

export const unmount = () => {
    console.log('Unmounting...');
    NetInfo.removeEventListener('connectionChange', connectionChangeHandler);
};

const connectionChangeHandler = (connectionType) => {
    return (dispatch) => {
        console.log('connectionType', connectionType);
        if (connectionType === 'none') {
            dispatch(connectionStatus(false));
        } else {
            dispatch(connectionStatus(true));
        }
    }
};

// Selectors
export const getStatus = (state) => {
  return {
      isFetching: state.playlistData.isFetching,
      isError: state.playlistData.isError
  }
};

export const getAppState = (state) => {
    return {
        isOnline: state.app.isOnline,
        localData: state.localData
    }
};

export const getPlaylistData = (state, category) => {
    return state.playlistData[category];
};