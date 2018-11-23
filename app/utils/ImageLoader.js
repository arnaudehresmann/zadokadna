import ImageStore from "./ImageStore";
import zadokaFirebase from '../utils/Firebase';
import RNFetchBlob from 'rn-fetch-blob';

class ImageLoader {
    async get(zadokaDay) {
        let uri = undefined;
        if(zadokaDay)
        {
            uri = await ImageStore.get(zadokaDay);
            const zadokaUrl = await zadokaFirebase.getZadokaUrl(!uri ? zadokaDay : undefined);
            if(!uri && zadokaUrl) {
                try {
                    const response = await RNFetchBlob.config({
                        fileCache: true,
                    })
                    .fetch('GET', url, {});
                    const status = response.info().status;
                    if(status == 200 )
                    {
                        uri = 'file://' + res.path();
                        ImageStore.set(zadokaDay, uri);
                    }                        
                } catch (errorMessage) {
                    console.error(errorMessage);
                }
            }    
        }

        return uri; 
    }
}

const imageLoader = new ImageLoader();
export default imageLoader;