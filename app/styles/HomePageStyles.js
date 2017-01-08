import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const homePageStyles = StyleSheet.create({
    ...fonts,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    intro: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 50,
    },
    sectionInfo: {
        paddingLeft: 20,
        paddingBottom: 40,
        paddingRight: 20,
        flexDirection: 'row'
    },
    sectionText: {
        paddingLeft: 10,
        fontFamily: 'Lato-Regular',
        flex: 1
    },
    sectionIcon: {
        alignItems: 'center',
        paddingLeft: 5,
        minWidth: 40
    }
});

export default homePageStyles;