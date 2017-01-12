import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const classPageStyles = StyleSheet.create({
    ...fonts,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 15
    },
    intro: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,
    },
    introBlock: {
        textAlign: 'justify',
    },
    cardContainer: {
        paddingBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
    },
    cardBottomDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray
    },
    cardHeader: {
        flexDirection: 'column',
        paddingBottom: 5,
        justifyContent: 'center'
    },
    cardOrder: {
        paddingRight: 8,
        color: colors.darkGray
    },
    cardTitle: {
        paddingBottom: 8
    },
    cardDescription: {
        textAlign: 'justify'
    },
    cardThumbnailContainer: {
        height: 180,
        width: 375,
        alignSelf: 'center'
    },
    cardThumbnail: {
        resizeMode: 'contain',
        height: 180,
        zIndex: 10,
        alignItems: 'center'
    },
    durationText: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: colors.white,
        alignSelf: 'flex-end',
        position: 'absolute',
        paddingLeft: 3,
        paddingRight: 3,
        bottom: 0,
        right: 28
    },
    syncContainer: {
        height: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 8,
        marginRight: 12
    },
    syncText: {
        alignSelf: 'center',
        paddingRight: 5,
        color: colors.darkGray
    },
    progress: {
        width: 22,
        height: 22
    },
    synced: {
        alignSelf: 'center'
    },
    offlineContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        backgroundColor: colors.lighterGray
    },
    offlineText: {
        color: colors.white
    }
});

export default classPageStyles;