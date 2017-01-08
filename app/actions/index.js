import { AsyncStorage, NetInfo } from 'react-native';
import RNFS from 'react-native-fs';

const playlistLocalStorageKey = 'Playlists';
const basePath = RNFS.DocumentDirectoryPath;

const getVideoFilePath = (videoId) => {
    return `${basePath}/${videoId}.mp4`;
};

const getImgFilePath = (videoId) => {
    return `${basePath}/${videoId}.jpg`;
};

export const CONNECTION_STATUS = 'CONNECTION_STATUS';
export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const READ_LOCAL_VIDEOS = 'READ_LOCAL_VIDEOS';
export const SAVING_LOCALPLAYLISTS = 'SAVING_LOCALPLAYLISTS';
export const SAVED_LOCALPLAYLISTS = 'SAVED_LOCALPLAYLISTS';
export const SAVING_VIDEO = 'SAVING_VIDEO';
export const SAVED_VIDEO = 'SAVED_VIDEO';
export const FAILED_SAVED_VIDEO = 'FAILED_SAVED_VIDEO';
export const REMOVED_VIDEO = 'REMOVED_VIDEO';
export const FAILED_REMOVE_VIDEO = 'FAILED_REMOVE_VIDEO';

export const connectionStatus = (isConnected) => {
    return {
        type: CONNECTION_STATUS,
        isConnected
    }
};

export const checkConnectivityStatus = () => {
    return (dispatch) => {
        NetInfo.isConnected.fetch().then(isConnected => dispatch(connectionStatus(isConnected)));
    }
};

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
                    console.log('Empty playlists');
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

const savingVideo = (videoId) => {
    return {
        type: SAVING_VIDEO,
        videoId
    }
};

const savedVideo = (videoId, videoPath, imgPath) => {
    return {
        type: SAVED_VIDEO,
        videoId,
        videoPath,
        imgPath
    }
};

const removedVideo = (videoId) => {
    return {
        type: REMOVED_VIDEO,
        videoId
    }
};

const failedSavedVideo = (videoId) => {
    return {
        type: FAILED_SAVED_VIDEO,
        videoId
    }
};

const failedRemovedVideo = (videoId) => {
    return {
        type: FAILED_REMOVE_VIDEO,
        videoId
    }
};

export const saveVideoLocally = (id, url, imgUrl) => {
    return (dispatch) => {
        dispatch(savingVideo(id));
        return RNFS.downloadFile({
                fromUrl: imgUrl,
                toFile: getImgFilePath(id)
            }).promise.then(() => {
                RNFS.downloadFile({
                    fromUrl: url,
                    toFile: getVideoFilePath(id),
                }).promise.then(() => {
                    dispatch(savedVideo(id, getVideoFilePath(id), getImgFilePath(id)));
                }).catch(() => {
                    dispatch(failedSavedVideo(id));
                    //todo: dispatch a popup ?
                });
            }).catch(() => {
                dispatch(failedSavedVideo(id));
            });
    }
};

export const removeLocalVideo = (id) => {
    return (dispatch) => {
        return RNFS.unlink(getVideoFilePath(id)).then(() => {
                    RNFS.unlink(getImgFilePath(id)).then(() => {
                        dispatch(removedVideo(id));
                    }).catch(() => {
                        dispatch(failedRemovedVideo(id));
                    });
               }).catch(() => {
                   dispatch(failedRemovedVideo(id));
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
                        path: `${basePath}/${v.name}`,
                        imgPath: `${basePath}/${id}.jpg`
                    };
                });
            dispatch(readLocalVideos(videoFiles));
        }).catch(err => {
            console.log(err);
            dispatch(readLocalVideos([]));
        });
    }
};

