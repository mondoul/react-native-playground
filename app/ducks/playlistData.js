import { AsyncStorage } from 'react-native';
import { playlistServiceURL } from '../config';


const playlistLocalStorageKey = 'Playlists';

// Actions
const CONNECTION_STATUS = 'CONNECTION_STATUS';
const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';

// Reducer
export default (state = {
    isFetching: true,
    isError: false,
    orientation: { items:[] },
    exercises: { items:[] },
    sequences: { items:[] }
}, action) => {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PLAYLISTS:
            if (action.error) {
                return Object.assign({}, state, {
                    isError: true,
                });
            } else {
                return Object.assign({}, state, {
                    isFetching: false,
                    orientation: action.orientation,
                    exercises: action.exercises,
                    sequences: action.sequences
                });
            }
        default:
            return state;
    }
};

// Action creators
export const requestPlaylists = () => {
    return {
        type: REQUEST_PLAYLISTS
    };
};

export const receivePlaylists = (data, error = false) => {
    return {
        type: RECEIVE_PLAYLISTS,
        orientation: data.playlists.find(p => p.id === data.orientation),
        exercises: data.playlists.find(p => p.id === data.exercises),
        sequences: data.playlists.find(p => p.id === data.sequences),
        error
    };
};

export const fetchPlaylists = () => {
    return (dispatch) => {
        dispatch(requestPlaylists());
        return fetch(playlistServiceURL)
            .then((response) => { return response.json(); })
            .then(json => {
                if (json.playlists.length > 0) {
                    dispatch(receivePlaylists(json));
                    AsyncStorage.setItem(playlistLocalStorageKey, JSON.stringify(json))
                        .then(() => dispatch({type: 'PLAYLISTS_STORED'}))
                        .catch((err) => console.log('Failed storing playlist locally.'));
                } else {
                    return getLocalPlaylists(dispatch);
                }
            }).catch(err => {
                console.log('Error fetching playlists', err);
                return getLocalPlaylists(dispatch);
            });
    };
};

const getLocalPlaylists = (dispatch) => {
    AsyncStorage.getItem(playlistLocalStorageKey)
        .then(localPlaylists => {
            dispatch(receivePlaylists(JSON.parse(localPlaylists), false, false));
        }).catch(err => {
        dispatch(receivePlaylists({}, true, false));
    });
};

