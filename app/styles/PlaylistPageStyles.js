import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const playlistPageStyles = StyleSheet.create({
    ...fonts,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.whiteSmoke,
    },
    toolbar: {
        backgroundColor: colors.turquoise,
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarTitle: {
        color: colors.whiteSmoke,
        textAlign: 'center',
        flex: 1
    },
    introBlock: {
        textAlign: 'justify',
    },
    introTitle: {
        paddingBottom: 8
    },
    playlistIntro: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
    },
    playlistItemContainer: {
        paddingBottom: 15,
        flexDirection: 'row',
    },
    playlistThumbnailContainer: {
        flex: 1,
        height: 150,
        paddingLeft: 10
    },
    playlistThumbnail: {
        flex: 1,
        resizeMode: 'contain',
        zIndex: 10,
    },
    playlistPlayOverlay: {
        alignSelf: 'center',
        top: 60,
        width: 30,
        height: 30,
        zIndex: 20,
        resizeMode: 'contain'
    },
    playlistItemWrapper: {
        flex:0.7,
        paddingLeft: 10,
        alignSelf: 'center'
    },
    playlistItemOrder: {
        fontSize: 14,
        color: colors.darkGray,
        paddingBottom: 8
    },
    playlistItemDescription: {
        fontSize: 13,
        paddingRight: 10
    }
});

export default playlistPageStyles;