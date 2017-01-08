import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import {
    Text,
    ScrollView,
    View
} from 'react-native';
import Toolbar from './Toolbar';
import styles from '../styles/HomePageStyles';
import colors from '../styles/colors';

class HomePage extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title='360° Pilates Mat'/>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.intro}>
                        <Text style={styles.defaultFont}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.
                            Nam vitae hendrerit tortor. Suspendisse potenti.</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Icon name='compass' size={40} color={colors.lightGray} style={styles.sectionIcon} />
                        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Icon name='list-thumbnails' size={40} color={colors.lightGray} style={styles.sectionIcon} />
                        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Icon name='play-circle' size={40} color={colors.lightGray} style={[styles.sectionIcon]} />
                        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at imperdiet nisl.
                            Etiam in neque et nulla congue sagittis id et enim.</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HomePage;