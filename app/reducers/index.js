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
                    path: action.path
                }
            });
        case types.FAILED_SAVED_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: false,
                    isError: true,
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
