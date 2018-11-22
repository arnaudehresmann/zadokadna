import { AsyncStorage } from "react-native"

class ImageStore {
    async get(zadokaDay) {
        try {
            const value = await AsyncStorage.getItem(zadokaDay);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.error(error);
        }
        return undefined;
    }

    async set(zadokaDay, image) {
        try {
            await AsyncStorage.setItem(zadokaDay, image);
        } catch (error) {
            console.error(error);
        }
    }

    async delete(zadokaDay) {
        AsyncStorage.removeItem(zadokaDay, (error) => console.error(error));
    }
}

const imageStrore = new ImageStore();
export default imageStrore;