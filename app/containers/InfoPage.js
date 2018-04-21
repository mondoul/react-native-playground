import React, { Component } from 'react';
import {
    View,
    Text,
    Linking,
    ScrollView,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export default class InfoPage extends Component {
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.intro}>
                    <Text style={styles.defaultFont}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                        Etiam in neque et nulla congue sagittis id et enim.
                        Nam vitae hendrerit tortor. Suspendisse potenti.</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerLink} onPress={() => Linking.openURL('http://benjamindegenhardt.com/')}>
                        http://benjamindegenhardt.com/
                    </Text>
                    <Text style={styles.footerC}>
                        Made with <Icon name='favorite' color='#FF4D4D'/> in NYC
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ...fonts,
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