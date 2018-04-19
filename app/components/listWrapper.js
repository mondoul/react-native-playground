import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import PropTypes from 'prop-types';

export default class ListWrapper extends Component {

    render() {

        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.intro}>
                    <Text style={styles.introBlock}>{this.props.description}</Text>
                </View>
                {this.props.children}
            </ScrollView>
        )

    }

}

ListWrapper.propTypes = {
    description: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 15
    },
    intro: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,
    },
    introBlock: {
        ...fonts.defaultFont,
        textAlign: 'justify',
    }
});