import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default class OfflineCard extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Icon name='prohibited' size={40} color={colors.white} />
                <Text style={styles.text}>
                    Not Available Offline
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        backgroundColor: colors.lighterGray
    },
    text: {
        color: colors.white,
        ...fonts.heavyFont
    }
});