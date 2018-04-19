import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import {
    Animated,
    Text,
    ScrollView,
    View
} from 'react-native';
import Toolbar from '../components/Toolbar';
import styles from '../styles/HomePageStyles';
import colors from '../styles/colors';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={{flex: 1, opacity: this.state.fadeAnim}}>
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
            </Animated.View>
        );
    }
}

export default HomePage;