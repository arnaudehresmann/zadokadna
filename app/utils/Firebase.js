import firebase from 'react-native-firebase';

class ZadokaFirebase {

    async getZadokaPath(zadokaDay) {
        let path = undefined;
        try {
            const doc = await firebase.firestore().collection('daily').doc(zadokaDay).get();
            if(doc.exists) {
                path = doc.get('path');            
            }   
        } catch (error) {
            console.error(error);            
        }   

        return path;
    }

    async getImageUrl(path) {
        let url = undefined;
        try {
            const ref = firebase.storage().ref(path);
            url = await ref.getDownloadURL();            
        } catch (error) {
            console.error(error);
        }
        return url;
    }

    async getZadokaUrl(zadokaDay) {
        let url = undefined;
        const path = await this.getZadokaPath(zadokaDay);
        if(path) {
            url = await this.getImageUrl(path);
        }
        return url;
    }
}

const zadokaFirebase = new ZadokaFirebase();
export default zadokaFirebase;