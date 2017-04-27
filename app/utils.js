import { Dimensions, Platform } from 'react-native';
import { saveVideoLocally, removeLocalVideo } from './actions';

const str_pad_left = (string,pad,length) => {
    return (new Array(length+1).join(pad)+string).slice(-length);
};

const IS_ANDROID = Platform.OS === 'android';
const { height, width } = Dimensions.get('window');

export const metrics = {
    ANDROID_STATUSBAR: 24,
    DEVICE_HEIGHT: IS_ANDROID ? height - 24 : height,
    DEVICE_WIDTH: width
};

export function getDuration(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return str_pad_left(minutes,'0',2) + ':' + str_pad_left(seconds,'0',2);
}

const mapLocalDataToCards = (items, localData) => {
    let cards = [];

    items.forEach(card => {
        let localItem = localData[card.id];
        const isLocal = localItem && !localItem.isError && !localItem.isSaving; // not local if currently being saved
        const isDownloading = localItem && localItem.isSaving;
        const isError = localItem && localItem.isError;
        const videoUri = isLocal ? localItem.path : card.video;
        const imgUri = isLocal ? `file://${localItem.imgPath}` : card.thumbnail;

        cards.push(
            Object.assign({}, card, {
                isLocal,
                isDownloading,
                isError,
                videoUri,
                imgUri
            })
        );

    });

    return cards;
};

export function mapStateToProps(state, ownProps) {
    let { localData } = state;
    let { isOnline } = state.playlistData;

    let { items } = ownProps.data;
    let cards = mapLocalDataToCards(items, localData);

    return {
        cards,
        isOnline
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        offlineSync: (id, category, available) => {
            if (available)
                dispatch(saveVideoLocally(id, category));
            else
                dispatch(removeLocalVideo(id));
        }
    }
}