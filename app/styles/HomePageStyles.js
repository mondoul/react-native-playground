import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const homePageStyles = StyleSheet.create({
    ...fonts,
    mainContainer: {
        flex: 1,
        backgroundColor: colors.whiteSmoke,
    },
    intro: {
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 50,
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
    }
});

export default homePageStyles;