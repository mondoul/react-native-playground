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
import { getDuration } from '../utils';

class ClassPage extends Component {

    renderCard(card, hasBottom) {
        let containerStyle = [styles.cardContainer];
        if (hasBottom)
            containerStyle.push(styles.cardBottomDivider);

        return (
            <View style={ containerStyle } key={card.order}>
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
                    <View style={{flex: 1 }}>
                        <Image style={styles.cardThumbnail} source={{uri: card.thumbnail }} >
                            <Text style={styles.durationText}>
                                { getDuration(card.duration) }
                            </Text>
                        </Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderClassPage() {
        let { description, items } = this.props.data;

        return (
            <View style={{flex:1}}>
                <View style={styles.toolbar}>
                    <Text style={[styles.heavyFont, styles.toolbarTitle]}>{this.props.title}</Text>
                </View>
                <ScrollView style={styles.mainContainer}>

                    <View style={styles.intro}>
                        <Text style={[styles.defaultFont, styles.introBlock]}>{description}</Text>
                    </View>
                    { items.map((card, i) => this.renderCard(card, i < items.length - 1)) }
                </ScrollView>
            </View>
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