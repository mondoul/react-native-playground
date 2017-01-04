import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';
import toolbarStyle from './toolbarStyle';

const infoPageStyles = StyleSheet.create({
    ...fonts,
    ...toolbarStyle,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
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