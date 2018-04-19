import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet} from 'react-native';
import fonts from '../styles/fonts';

export default class CardHeader extends Component {

    render() {

        const { title, description } = this.props;

        return(
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        );
    }

}

CardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        justifyContent: 'center'
    },
    title: {
        ...fonts.heavyFont,
        paddingBottom: 8
    },
    description: {
        ...fonts.defaultFont,
        textAlign: 'justify'
    }
});