import SecureStore from "./SecureStore";
import WrapperError from "@lib/errors/WrapperError";
import post from "@lib/fetch/post";
import AccessToken from "./AccessToken";

type ResponseType = {
    accessToken: string;
    refreshToken: string;
};

export default class RefreshToken {
    public static key = "refresh_token";

    /**
     * Gets the `refresh_token` from the `SecureStore` on the device
     * @returns {string} the `access_token` as a string or `null` when not stored yet
     */
    public static async get() {
        return await SecureStore.getItemAsync(this.key);
    }

    /**
     * Saves (and possibly overwrites) previous `refresh_token` in the `SecureStore`
     * @param token {string} the `refresh_token`, that we want to store 
     */
    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }

    /**
     * Queries a new `refresh_token`˙and a new `access_token` from the remote server and stores it in the `SecureStore`
     * @returns the `access_token` and the `refresh_token`
     */
    public static async refresh(): Promise<[ResponseType, WrapperError]> {
        const [data, error] = await post<ResponseType>("/auth/refresh", {
            body: JSON.stringify({
                refresh_token: await this.get(),
                web: false,
            }),
        });

        if(error) return [null, error];

        await RefreshToken.save(data.refreshToken);
        await AccessToken.save(data.accessToken);
        return [data, null];
    }
}