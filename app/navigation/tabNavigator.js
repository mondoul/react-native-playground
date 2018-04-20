import React from 'react';
import {TabBarBottom, TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Foundation';
import colors from '../styles/colors';
import HomePage from '../containers/HomePage';
import InfoPage from '../containers/InfoPage';

export default TabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: { title: '360° Pilates Mat'}
        },
        Orientation: {
            screen: InfoPage,
            navigationOptions: { title: 'Orientation'}
        },
        Exercises: {
            screen: InfoPage,
            navigationOptions: { title: 'Exercises'}
        },
        Sequences: {
            screen: InfoPage,
            navigationOptions: { title: 'Sequences'}
        },
        Info: {
            screen: InfoPage,
            navigationOptions: { title: 'About 360° Pilates'}
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Home': iconName = 'home';
                        break;
                    case 'Orientation': iconName = 'compass';
                        break;
                    case 'Exercises': iconName = 'list-thumbnails';
                        break;
                    case 'Sequences': iconName = 'play-circle';
                        break;
                    case 'Info': iconName = 'info';
                        break;
                }

                return <Icon name={iconName} size={30} color={tintColor} />
            }
        }),
        tabBarOptions: {
            activeTintColor: colors.turquoise,
            inactiveTintColor: colors.inactiveTab,
            showLabel: false,
            style: {
                backgroundColor: colors.black
            }
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true
    }
);