import React, { Component } from 'react';
import {
    View,
    Text,
    Linking,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/InfoPageStyles';
import Toolbar from './Toolbar';

class InfoPage extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={this.props.title} />
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
            </View>
        )
    }
}

export default InfoPage;
