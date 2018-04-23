import React from 'react';
import { connect } from 'react-redux';

import CardList from '../components/cardList';

import * as nav from '../ducks/nav';
import * as app from '../ducks/app';
import { removeLocalVideo, saveVideoLocally } from '../ducks/localData';

const mapStateToProps = (state, ownProps) => {
    const { isOnline, localData } = app.getAppState(state);
    const { category, large } = nav.getNavigationParams(ownProps);
    const { items, description } = app.getPlaylistData(state, category);

    const cards = items.map(item => {
        const localItem = localData[item.id];

        // NOT a local item
        if (typeof localItem === 'undefined') {
            return Object.assign({}, item, {
                isLocal: false,
                isDownloading: false,
                isError: false,
                videoUri: item.video,
                imgUri: item.thumbnail
            });
        }

        // Local item
        const isLocal = !localItem.isError && !localItem.isSaving; // if error or being saved, it's not local yet
        return Object.assign({}, item, {
            isLocal,
            isDownloading: localItem.isSaving,
            isError: localItem.isError,
            videoUri: isLocal ? localItem.path : item.video,
            imgUri: isLocal ? `file://${localItem.imgPath}` : item.thumbnail
        });

    });

    return {
        cards,
        description,
        category,
        isOnline,
        large
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { category } = nav.getNavigationParams(ownProps);
    return {
        offlineSync: (id, available) => {
            if (available) {
                dispatch(saveVideoLocally(id, category));
            } else {
                dispatch(removeLocalVideo(id));
            }
        },
        showVideo: (card) => {
            dispatch(nav.navigateToVideoPlayer({
                    video: {
                            src: card.videoUri,
                            title: card.title,
                            id: card.id
                    }
                }))
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(CardList);