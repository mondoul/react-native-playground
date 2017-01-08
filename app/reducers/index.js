import { combineReducers } from "redux";
import * as types from "../actions";

const playlistData = (state = {
    isFetching: true,
    isOnline: true,
    isError: false,
    classes: { items:[] },
    basics: { items:[] },
    latest: { items:[] }
}, action) => {
    switch (action.type) {
        case types.REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_PLAYLISTS:
            if (action.error) {
                return Object.assign({}, state, {
                    isError: action.error,
                    isOnline: action.isOnline
                });
            } else {
                return Object.assign({}, state, {
                    isFetching: false,
                    isOnline: action.isOnline,
                    classes: action.data.playlists.find(p => p.id === '4221859'),
                    basics: action.data.playlists.find(p => p.id === '4221862'),
                    latest: action.data.playlists.find(p => p.id === '4221868')
                });
            }
        case types.CONNECTION_STATUS:
            return Object.assign({}, state, {
                isOnline: action.isConnected
            });
        default:
            return state;
    }
};

const localData = (state = {}, action) => {
    switch(action.type) {
        case types.SAVING_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: true,
                    isError: false,
                }
            });

        case types.SAVED_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: false,
                    isError: false,
                    path: action.videoPath,
                    imgPath: action.imgPath
                }
            });
        case types.REMOVED_VIDEO:
            delete state[action.videoId]; // is there a better way without mutating the state ?
            return Object.assign({}, state);
        case types.FAILED_SAVED_VIDEO:
        case types.FAILED_REMOVE_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: false,
                    isError: true,
                    imgPath: null,
                    path: null
                }
            });
        case types.READ_LOCAL_VIDEOS: {
            let newState = {};
            action.videos.forEach(v => {
                Object.assign(newState, {
                    [v.id]: {
                        isSaving: false,
                        isError: false,
                        imgPath: v.imgPath,
                        path: v.path
                    }
                })
            });

            return Object.assign({}, state, newState);
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    playlistData,
    localData
});

export default rootReducer;
