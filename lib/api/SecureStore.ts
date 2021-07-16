import * as ExpoSecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Secret from "@lib/encryption/Secret";
import AES from "@lib/encryption/AES";

/**
 * A wrapper class for `expo-secure-store` implementing storage for more then 2048 bytes
 */
export default class SecureStore {
    public static async isAvailableAsync() {
        return await ExpoSecureStore.isAvailableAsync();
    }

    public static async deleteItemAsync(key: string) {
        // Remove the encryption key and the secret
        await Promise.all([
            ExpoSecureStore.deleteItemAsync(`wault_secure_store_secret_${key}`),
            AsyncStorage.removeItem(`wault_secure_store_value_${key}`),
        ])
    }

    public static async getItemAsync(key: string) {
        // Get the secret encryption key and the value from two separate source
        const [secret, encrypted] = await Promise.all([
            ExpoSecureStore.getItemAsync(`wault_secure_store_secret_${key}`),
            AsyncStorage.getItem(`wault_secure_store_value_${key}`),
        ]);

        // If either the secret or the value is missing, then just return null
        if(!secret || !encrypted) return;

        // Decrypt the data and send back the response
        return AES.decrypt(encrypted, secret);
    }

    public static async setItemAsync(key: string, value: string) {
        // Generate a new secret, that we are going to use to encrypt data
        const secret = await Secret.generate();

        // Store this secret in the SecureStorage for later usage
        await ExpoSecureStore.setItemAsync(`wault_secure_store_secret_${key}`, secret);

        // Encrypt the given plain string object
        const encrypted = AES.encrypt(value, secret);

        // Store the encrypted string inside the AsyncStorage
        await AsyncStorage.setItem(`wault_secure_store_value_${key}`, encrypted);

        // Return a `true` value to inidcate success
        return true;
    }
}