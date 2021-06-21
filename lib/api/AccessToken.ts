
import SecureStore from "@lib/api/SecureStore";

export default class AccessToken {
    public static key = "access_token";

    /**
     * Gets the `access_token` from the local encrypted store
     * @returns the `access_token` as a JWT string
     */
    public static async get() {
        return await SecureStore.getItemAsync(this.key);
    }

    /**
     * Saves the `access_token` in the `SecureStore` on the device
     * @param token {string} the `access_token` we want to store
     */
    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }
}