import SecureStore from "@lib/api/SecureStore";
import post from "@lib/fetch/post";
import AccessToken from "./AccessToken";

export default class RefreshToken {
    public static key = "refresh_token";

    /**
     * Gets the `refresh_token` from the local encrypted store
     * @returns the `refresh_token` as a JWT string
     */
    public static async get() {
        return await SecureStore.getItemAsync(this.key);
    }

    /**
     * Saves the `refresh_token` in the `SecureStore` on the device
     * @param token {string} the `refresh_token` we want to store
     */
    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }

    /**
     * Refreshes the refresh and the access token
     */
    public static async refresh() {
        type ResponseType = {
            accessToken: string;
            refreshToken: string;
        };

        const { accessToken, refreshToken } = await post<ResponseType>("/auth/refresh_token", {
            body: JSON.stringify({
                refreshToken: await this.get(),
            })
        });

        await Promise.all([
            AccessToken.save(accessToken),
            this.save(refreshToken),
        ]);

        return true;
    }
}