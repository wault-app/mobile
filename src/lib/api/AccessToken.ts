
import SecureStore from "../api/SecureStore";

export default class AccessToken {
    public static key = "access_token";

    public static async get() {
        return await SecureStore.getItemAsync(this.key);
    }

    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }
}