import { Dimensions, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const { height, width } = Dimensions.get('window');

export const metrics = {
    ANDROID_STATUSBAR: 24,
    DEVICE_HEIGHT: IS_ANDROID ? height - 24 : height,
    DEVICE_WIDTH: width
};

export const str_pad_left = (string,pad,length) => {
    return (new Array(length+1).join(pad)+string).slice(-length);
};

export const playlistServiceURL = 'https://threesixty-pilates-mat.herokuapp.com/playlists';