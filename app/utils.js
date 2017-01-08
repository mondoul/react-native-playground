import { Platform } from 'react-native';

const str_pad_left = (string,pad,length) => {
    return (new Array(length+1).join(pad)+string).slice(-length);
};

export function getDuration(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return str_pad_left(minutes,'0',2) + ':' + str_pad_left(seconds,'0',2);
}


export function mapLocalDataToCards(items, localData) {
    let cards = [];

    items.forEach(i => {
        let localItem = localData[i.id];
        if (localItem && !localItem.isError) {
            cards.push(
                Object.assign({}, i, {
                    isLocal: !localItem.isSaving, // not local if currently being saved
                    isDownloading: localItem.isSaving,
                    isError: localItem.isError,
                    imgPath: localItem.imgPath,
                    path: localItem.path
                })
            );
        } else {
            cards.push(
                Object.assign({}, i, {
                    isLocal: false,
                    isDownloading: false
                })
            );
        }
    });

    return cards;
}