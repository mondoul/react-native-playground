import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default class OfflineCard extends Component {
    render() {

        const iconSize = this.props.large ? 40 : 20;
        const styles = conditionalStyles(this.props);

        return(
            <View style={styles.container}>
                <Icon name='prohibited' size={iconSize} color={colors.white} />
                {
                    this.props.large &&
                    <Text style={styles.text}>
                        Not Available Offline
                    </Text>
                }
            </View>
        );
    }
}

const conditionalStyles = (props) => StyleSheet.create({
    container: StyleSheet.flatten([
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.lighterGray
        },
        props.large &&
        {
            height: 180,
        },
        props.small &&
        {
            height: 80,
        }
    ]),
    text: {
        color: colors.white,
        ...fonts.heavyFont
    }
});