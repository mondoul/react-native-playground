import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Navigator
} from 'react-native';
import styles from '../styles/ClassPageStyles';

class ClassPage extends Component {

    renderCard(card) {
        return (
            <View style={styles.cardContainer} key={card.order}>
                <View style={styles.cardHeader}>
                    <Text style={[styles.heavyFont, styles.cardOrder]}>{card.order}.</Text>
                    <Text style={[styles.defaultFont, styles.cardDescription]}>{card.description}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigator.push({
                        id: 'VideoPlayer',
                        video: { src: card.video, title: card.title },
                        sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                    })} style={styles.cardThumbnailContainer}>
                    <View style={{flex: 1}}>
                        <Image style={styles.cardThumbnail} source={{uri: card.thumbnail }} >
                            <Image style={styles.playOverlay} source={ require('../img/play.png') } />
                        </Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderClassPage() {
        let { introduction, items } = this.props.data;

        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>{this.props.title}</Text>
                </View>
                <View style={styles.intro}>
                    <Text style={[styles.defaultFont, styles.introBlock]}>{introduction}</Text>
                </View>
                { items.map(i => this.renderCard(i)) }
            </ScrollView>
        );
    }

    render() {
        return (
            <Navigator
                renderScene={ this.renderClassPage.bind(this) }
                navigator={this.props.navigator} />
        )
    }
}

export default ClassPage;