import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';
import toolbarStyle from './toolbarStyle';

const classPageStyles = StyleSheet.create({
    ...fonts,
    ...toolbarStyle,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.whiteSmoke,
    },
    intro: {
        paddingTop: 20,
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
        marginBottom: 15
    },
    cardBottomDivider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray
    },
    cardHeader: {
        flexDirection: 'row',
        paddingBottom: 15
    },
    cardOrder: {
        paddingRight: 8,
        color: colors.darkGray
    },
    cardDescription: {
        flex: 1,
        textAlign: 'justify',
        paddingRight: 15
    },
    cardThumbnailContainer: {
        flex:1,
        height: 180,
        width: 375,
        alignSelf: 'center'
    },
    cardThumbnail: {
        flex: 1,
        resizeMode: 'contain',
        zIndex: 10,
        alignItems: 'center'
    },
    playOverlay: {
        alignSelf: 'center',
        top: 60,
        zIndex: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'rgba(255,255,255, 0.7)'
    },
    durationText: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        alignSelf: 'flex-end',
        position: 'absolute',
        paddingLeft: 3,
        paddingRight: 3,
        bottom: 0,
        right: 28
    }
});

export default classPageStyles;