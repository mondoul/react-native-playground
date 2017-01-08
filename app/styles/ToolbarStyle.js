import {
    StyleSheet
} from 'react-native';

import colors from './colors';
import fonts from './fonts';

const toolbarStyle = StyleSheet.create({
    ...fonts,
    toolbar: {
        backgroundColor: colors.white,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarTitle: {
        color: colors.darkerGray,
        textAlign: 'center',
        flex: 1
    },
});

export default toolbarStyle;
