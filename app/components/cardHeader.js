import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet} from 'react-native';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export default class CardHeader extends Component {

    render() {

        const { title, description } = this.props;
        const styles = conditionalStyles(this.props);

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
    description: PropTypes.string,
    large: PropTypes.bool,
    small: PropTypes.bool
};

const conditionalStyles = (props) => StyleSheet.create({
    container: StyleSheet.flatten([
        props.large && {
            paddingBottom: 5,
            justifyContent: 'center'
        },
        props.small && {
            flex: 1.5,
            marginLeft: 20,
            alignSelf: 'flex-start'
        }
    ]),
    title: StyleSheet.flatten([
        {
            ...fonts.heavyFont,
            paddingBottom: 8
        },
        props.small && {
            fontSize: 14,
            color: colors.darkGray
        }
    ]),
    description: StyleSheet.flatten([
        {
            ...fonts.defaultFont
        },
        props.large &&
        {
            textAlign: 'justify'
        },
        props.small &&
        {
            fontSize: 13,
            paddingRight: 10
        }
    ])
});