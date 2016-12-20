import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const classPageStyles = StyleSheet.create({
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
        paddingBottom: 15
    },
    cardHeader: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 10,
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
        height: 180
    },
    cardThumbnail: {
        flex: 1,
        resizeMode: 'contain',
        zIndex: 10,
    },
    playOverlay: {
        alignSelf: 'center',
        top: 60,
        width: 60,
        height: 60,
        zIndex: 20,
        resizeMode: 'contain'
    }
});

export default classPageStyles;