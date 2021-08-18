import Secret from "./Secret";
import SecureStore from "@lib/api/SecureStore";

export default class EncryptionKey {
    public static async generate() {
        return await Secret.generate();
    }

    public static async save(key: string) {
        return await SecureStore.setItemAsync("encryption_key", key);
    }

    public static async get() {
        return await SecureStore.getItemAsync("encryption_key");
    }
}