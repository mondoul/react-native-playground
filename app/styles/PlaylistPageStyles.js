import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';
import toolbarStyle from './toolbarStyle';

const playlistPageStyles = StyleSheet.create({
    ...fonts,
    ...toolbarStyle,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
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
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    playlistItemBottomDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray
    },
    playlistThumbnailContainer: {
        flex: 1,
        width: 200,
        height: 115,
    },
    playlistThumbnail: {
        flex: 1,
        resizeMode: 'contain',
        zIndex: 10,
        position: 'relative'
    },
    durationText: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: colors.white,
        alignSelf: 'flex-end',
        position: 'absolute',
        paddingLeft: 3,
        paddingRight: 3,
        bottom: 0,
        right: 0
    },
    playlistItemWrapper: {
        flex:0.7,
        paddingLeft: 10,
        alignSelf: 'flex-start'
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