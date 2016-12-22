import React, { Component } from 'react';
import {
    View,
    Text,
    Linking,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/InfoPageStyles';

class InfoPage extends Component {
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>{this.props.title}</Text>
                </View>
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

export default InfoPage;
