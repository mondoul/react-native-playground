import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Navigator
} from 'react-native';
import styles from '../styles/ToolbarStyle';

class Toolbar extends Component {
    render() {
        return (
            <View style={styles.toolbar}>
                <Text style={[styles.heavyFont, styles.toolbarTitle]}>{this.props.title}</Text>
            </View>
        );
    }
}

Toolbar.propTypes = {
    title: PropTypes.string
};

export default Toolbar;