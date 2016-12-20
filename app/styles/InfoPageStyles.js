import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const infoPageStyles = StyleSheet.create({
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
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 50,
    },
    footerContainer: {
        flex: 1,
        alignItems: 'center'
    },
    footerLink: {
        fontSize: 15,
        paddingBottom: 30,
        color: colors.blue,
        textDecorationLine : 'underline'
    },
    footerC: {
        fontSize: 15
    }
});

export default infoPageStyles;