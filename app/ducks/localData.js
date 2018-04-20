import RNFS from 'react-native-fs';
const basePath = RNFS.DocumentDirectoryPath;

const getVideoFilePath = (videoId) => {
    return `${basePath}/${videoId}.mp4`;
};

const getImgFilePath = (videoId) => {
    return `${basePath}/${videoId}.jpg`;
};

// Actions
const SAVING_VIDEO = 'SAVING_VIDEO';
const SAVED_VIDEO = 'SAVED_VIDEO';
const REMOVED_VIDEO = 'REMOVED_VIDEO';
const READ_LOCAL_VIDEOS = 'READ_LOCAL_VIDEOS';
const FAILED_SAVED_VIDEO = 'FAILED_SAVED_VIDEO';
const FAILED_REMOVE_VIDEO = 'FAILED_REMOVE_VIDEO';

// Reducer
export default (state = {}, action) => {
    switch(action.type) {
        case SAVING_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: true,
                    isError: false,
                }
            });

        case SAVED_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: false,
                    isError: false,
                    path: action.videoPath,
                    imgPath: action.imgPath
                }
            });

        case REMOVED_VIDEO:
            delete state[action.videoId]; // is there a better way without mutating the state ?
            return Object.assign({}, state);

        case FAILED_SAVED_VIDEO:
        case FAILED_REMOVE_VIDEO:
            return Object.assign({}, state, {
                [action.videoId]: {
                    isSaving: false,
                    isError: true,
                    imgPath: null,
                    path: null
                }
            });
        case READ_LOCAL_VIDEOS: {
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

// Action Creators
export const savingVideo = (videoId) => {
    return {
        type: SAVING_VIDEO,
        videoId
    }
};

export const savedVideo = (videoId, videoPath, imgPath) => {
    return {
        type: SAVED_VIDEO,
        videoId,
        videoPath,
        imgPath
    }
};

export const removedVideo = (videoId) => {
    return {
        type: REMOVED_VIDEO,
        videoId
    }
};

export const failedSavedVideo = (videoId) => {
    return {
        type: FAILED_SAVED_VIDEO,
        videoId
    }
};

export const failedRemovedVideo = (videoId) => {
    return {
        type: FAILED_REMOVE_VIDEO,
        videoId
    }
};

export const readLocalVideos = (videos) => {
    return {
        type: READ_LOCAL_VIDEOS,
        videos
    }
};

export const saveVideoLocally = (id, category) => {
    return (dispatch, getState) => {
        dispatch(savingVideo(id));
        let { items } = getState().playlistData[category];
        const video = items.find(i => i.id === id);
        let imgUrl = video.thumbnail;
        let videoUrl = video.download;
        return RNFS.downloadFile({
            fromUrl: imgUrl,
            toFile: getImgFilePath(id)
        }).promise.then(() => {
            RNFS.downloadFile({
                fromUrl: videoUrl,
                toFile: getVideoFilePath(id),
            }).promise.then(() => {
                dispatch(savedVideo(id, getVideoFilePath(id), getImgFilePath(id)));
            }).catch(() => {
                dispatch(failedSavedVideo(id));
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