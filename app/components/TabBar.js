import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/TabStyles';
import {
    TouchableOpacity,
    View
} from 'react-native';

class TabBar extends Component {

    tabIcons = [];

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
    }

    setAnimationValue({ value, }) {
        this.tabIcons.forEach((icon, i) => {
            const progress = Math.min(1, Math.abs(value - i));
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    }

    //color between rgb(77, 214, 202) and rgb(204,204,204)
    iconColor(progress) {
        const red = 77 + (204 - 77) * progress;
        const green = 214 + (204 - 214) * progress;
        const blue = 202 + (204 - 202) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    render() {
        return (
            <View style={[styles.tabs, this.props.style ]}>
                {this.props.tabs.map((tab, i) => {
                    return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                        <Icon
                            name={tab}
                            size={30}
                            color={this.props.activeTab === i ? 'rgb(77, 214, 202)' : 'rgb(204,204,204)'}
                            ref={(icon) => { this.tabIcons[i] = icon; }}
                        />
                    </TouchableOpacity>;
                })}
            </View>
        );
    }

}

export default TabBar;
