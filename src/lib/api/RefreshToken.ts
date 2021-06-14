import SecureStore from "./SecureStore";
import WrapperError from "../errors/WrapperError";
import get from "../fetch/get";
import post from "../fetch/post";

type ResponseType = {
    accessToken: string;
    refreshToken: string;
};

export default class RefreshToken {
    public static key = "refresh_token";

    public static async get() {
        return await SecureStore.getItemAsync(this.key);
    }

    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }

    public static async refresh(): Promise<[ResponseType] | [undefined, WrapperError]> {
        const [data, error] = await post<ResponseType>("/auth/refresh", {
            body: JSON.stringify({
                refresh_token: await this.get(),
                web: false,
            }),
        });

        if(error) return [undefined, error];

        await RefreshToken.save(data.refreshToken);
        return [data];
    }
}