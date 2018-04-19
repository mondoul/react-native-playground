import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import data from './data.json';
import ClassCard from '../../app/components/classCard';
import OfflineCard from '../../app/components/offlineCard';
import VideoCard from '../../app/components/videoCard';
import SyncButton from '../../app/components/syncButton';
import CardHeader from '../../app/components/cardHeader';
import ClassCardList from '../../app/components/classCardList';

const { items } = data.playlists[0]; // get test items

const card = Object.assign({}, items[0], {
    imgUri: items[0].thumbnail,
    videoUri: items[0].video
});

const classesPlaylist = data.playlists.find(p => p.id === '4221859');

storiesOf('Class Card/components', module)
    .addDecorator(story => (
        <View style={{ flex:1, paddingBottom: 20,
            marginLeft: 28,
            marginRight: 28,
            marginBottom: 15,
            marginTop: 50}}>{story()}</View>
    ))
    .add('Offline Card', () => (
        <OfflineCard/>
    ))
    .add('Video Card', () => (
        <VideoCard onCardPress={action('card pressed')} card={card}/>
    ))
    .add('Sync button off', () => (
        <SyncButton isLocal={false} isDownloading={false} sync={action('sync')} remove={action('remove')}/>
    ))
    .add('Sync button synced', () => (
        <SyncButton isLocal={true} isDownloading={false} sync={action('sync')} remove={action('remove')}/>
    ))
    .add('Sync button disabled', () => (
        <SyncButton isLocal={false} isDownloading={false} sync={action('sync')} remove={action('remove')}/>
    ))
    .add('Sync button downloading', () => (
        <SyncButton isLocal={false} isDownloading={true} sync={action('sync')} remove={action('remove')}/>
    ))
    .add('Card Header', () => (
        <CardHeader title={card.title} description={card.description}/>
    ));

storiesOf('Class Card/examples', module)
    .add('Card online', () => {
        card.isDownloading = false;
        card.isLocal = false;
        return (
            <ClassCard card={card} isOnline={true} offlineSync={action('offline sync')} showVideo={action('showVideo')} drawBottomDivider={false}/>
        );
    })
    .add('Card offline', () => {
        card.isDownloading = false;
        card.isLocal = false;
        return (
            <ClassCard card={card} isOnline={false} offlineSync={action('offline sync')} showVideo={action('showVideo')} drawBottomDivider={false}/>
        );
    })
    .add('Card local', () => {
        card.isDownloading = false;
        card.isLocal = true;
        return (
            <ClassCard card={card} isOnline={true} offlineSync={action('offline sync')} showVideo={action('showVideo')} drawBottomDivider={false}/>
        );
    })
    .add('Cards List Online', () => {
        const cards = classesPlaylist.items.map(c => {
            return Object.assign({}, c, {
                isLocal: false,
                isDownloading: false,
                imgUri: c.thumbnail,
                videoUri: c.video
            });
        });

        return (
            <ClassCardList isOnline={true}
                           description={classesPlaylist.description}
                           showVideo={action('Show Video')}
                           offlineSync={action('Sync')}
                           cards={cards} />
        )
    });