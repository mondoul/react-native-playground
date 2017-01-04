import { AsyncStorage } from 'react-native';
import RNFS from 'react-native-fs';

const playlistLocalStorageKey = 'Playlists';
const basePath = RNFS.DocumentDirectoryPath;

const getFilePath = (videoId) => {
    return `${basePath}/${videoId}.mp4`;
};

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const READ_LOCAL_VIDEOS = 'READ_LOCAL_VIDEOS';
export const SAVING_LOCALPLAYLISTS = 'SAVING_LOCALPLAYLISTS';
export const SAVED_LOCALPLAYLISTS = 'SAVED_LOCALPLAYLISTS';
export const SAVING_VIDEO = 'SAVING_VIDEO';
export const SAVED_VIDEO = 'SAVED_VIDEO';
export const FAILED_SAVED_VIDEO = 'FAILED_SAVED_VIDEO';

const requestPlaylists = () => {
    return {
        type: REQUEST_PLAYLISTS
    };
};

const savingLocalPlaylists = () => {
    return {
        type: SAVING_LOCALPLAYLISTS
    };
};

const savedLocalPlaylists = () => {
    return {
        type: SAVED_LOCALPLAYLISTS
    };
};

const receivePlaylists = (data, error = false, isOnline = true) => {
    return {
        type: RECEIVE_PLAYLISTS,
        data,
        error,
        isOnline
    };
};

export const fetchPlaylists = () => {
    return (dispatch) => {
        dispatch(requestPlaylists());
        return fetch('https://pilates-playlist.herokuapp.com/playlists')
            .then((response) => { return response.json(); })
            .then(json => {
                if (json.playlists.length > 0) {
                    dispatch(receivePlaylists(json));
                    dispatch(savingLocalPlaylists());
                    AsyncStorage.setItem(playlistLocalStorageKey, JSON.stringify(json))
                        .then(() => dispatch(savedLocalPlaylists()));
                } else {
                    console.log('Empty playlists', err);
                    getLocalPlaylists();
                }
            }).catch(err => {
                console.log('Error fetching playlists', err);
                getLocalPlaylists();
            });
    };
};

const getLocalPlaylists = () => {
   return AsyncStorage.getItem(playlistLocalStorageKey)
       .then(localPlaylists => {
           dispatch(receivePlaylists(JSON.parse(localPlaylists), false, false));
       }).catch(err => {
           dispatch(receivePlaylists({}, true, false));
       });
};

const savingVideo = (videoId) => {
    return {
        type: SAVING_VIDEO,
        videoId
    }
};

const savedVideo = (videoId, path) => {
    return {
        type: SAVED_VIDEO,
        videoId,
        path
    }
};

const failedSavedVideo = (videoId) => {
    return {
        type: FAILED_SAVED_VIDEO,
        videoId
    }
};

export const saveVideoLocally = (id, url) => {
    return (dispatch) => {
        dispatch(savingVideo(id));
        return RNFS.downloadFile({
                fromUrl: url,
                toFile: getFilePath(id),
            }).promise.then(() => {
                dispatch(savedVideo(id, getFilePath(id)));
            }).catch(() => {
                dispatch(failedSavedVideo(id));
                //todo: dispatch a popup ?
            });
    }
};

const readLocalVideos = (videos) => {
    return {
        type: READ_LOCAL_VIDEOS,
        videos
    }
};

export const fetchLocalVideos = () => {
    return (dispatch) => {
        RNFS.readDir(basePath).then(res => {
            let videoFiles = res.filter(r => r.name.endsWith('.mp4'))
                .map(v => {
                    let id = v.name.substr(0, v.name.indexOf('.mp4'));
                    return {
                        id,
                        path: `${basePath}/${v.name}`
                    };
                });
            dispatch(readLocalVideos(videoFiles));
        }).catch(err => {
            console.log(err);
            dispatch(readLocalVideos([]));
        });
    }
};

