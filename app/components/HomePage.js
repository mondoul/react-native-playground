import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Text,
    ScrollView,
    View
} from 'react-native';
import styles from '../styles/HomePageStyles';
import colors from '../styles/colors';

class HomePage extends Component {
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>360 Pilates</Text>
                </View>
                <View style={styles.intro}>
                    <Text style={styles.defaultFont}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                        Etiam in neque et nulla congue sagittis id et enim.
                        Nam vitae hendrerit tortor. Suspendisse potenti.</Text>
                </View>
                <View style={styles.sectionInfo}>
                    <Icon name='class' size={40} color={colors.blue} />
                    <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                        Etiam in neque et nulla congue sagittis id et enim.</Text>
                </View>
                <View style={styles.sectionInfo}>
                    <Icon name='assignment' size={40} color={colors.blue} />
                    <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                        Etiam in neque et nulla congue sagittis id et enim.</Text>
                </View>
                <View style={styles.sectionInfo}>
                    <Icon name='airline-seat-recline-extra' size={40} color={colors.blue} />
                    <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                        Etiam in neque et nulla congue sagittis id et enim.</Text>
                </View>
            </ScrollView>
        );
    }
}

export default HomePage;