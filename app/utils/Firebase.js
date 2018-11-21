import firebase from 'react-native-firebase';

class ZadokaFirebase {

    async getZadokaPath(zadokaDay) {
        const doc = await firebase.firestore().doc('daily/' + zadokaDay).get();
        return doc.get('path');
    }

    async getImageUrl(path) {
        const ref = firebase.storage().ref(path);
        const url = await ref.getDownloadURL();
        return url;
    }

    async getZadokaUrl(zadokaDay) {
        const path = await this.getZadokaPath(zadokaDay);
        return await this.getImageUrl(path);
    }
}

const zadokaFirebase = new ZadokaFirebase();
export default zadokaFirebase;