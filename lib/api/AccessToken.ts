import SecureStore from "@lib/api/SecureStore";

export default class SessionToken {
    public static key = "session_token";

    /**
     * Gets the `session_token` from the local encrypted store
     * @returns the `session_token` as a JWT string
     */
    public static async get() {
        return await SecureStore.getItemAsync(this.key);
    }

    /**
     * Saves the `session_token` in the `SecureStore` on the device
     * @param token {string} the `session_token` we want to store
     */
    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }
}