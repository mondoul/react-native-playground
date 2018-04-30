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
            const { [action.videoId]: _ , ...newState } = state;
            return newState;

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
                newState[v.id] = {
                        isSaving: false,
                        isError: false,
                        imgPath: v.imgPath,
                        path: v.path
                    }
            });

            return Object.assign({}, state, newState);
        }
        default:
            return state;
    }
};

// Action Creators
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

const readLocalVideos = (videos) => {
    return {
        type: READ_LOCAL_VIDEOS,
        videos
    }
};

export const saveVideoLocally = (id, thumbnailUri, videoUri) => {
    return (dispatch) => {
        dispatch(savingVideo(id));

        const downloadImg = RNFS.downloadFile({
            fromUrl: thumbnailUri,
            toFile: getImgFilePath(id)
        }).promise;

        const downloadVideo =  RNFS.downloadFile({
            fromUrl: videoUri,
            toFile: getVideoFilePath(id),
        }).promise;

        return Promise.all([downloadImg, downloadVideo])
            .then((results) => {
                if (results.some(r => r.statusCode !== 200)) {
                    dispatch(failedSavedVideo(id))
                } else {
                    dispatch(savedVideo(id, getVideoFilePath(id), getImgFilePath(id)));
                }
            })
            .catch(() => dispatch(failedSavedVideo(id)));
        }
};

export const removeLocalVideo = (id) => {
    return (dispatch) => {
        const removeVideoFile = RNFS.unlink(getVideoFilePath(id));
        const removeImgFile = RNFS.unlink(getImgFilePath(id));

        return Promise.all([removeImgFile, removeVideoFile])
                    .then(() => dispatch(removedVideo(id)))
                    .catch(() => dispatch(failedRemovedVideo(id)));
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