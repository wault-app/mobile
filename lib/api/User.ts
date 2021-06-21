import JWT from "jsonwebtoken";
import AccessToken from "./AccessToken";

type ResponseType = {
    id: string;
    username: string;
    deviceid: string;
};

export default class User {
    /**
     * Loads the user from the stored `access_token`
     * @returns an object containing data about the user
     */
    public static async load(): Promise<ResponseType> {
        const token = JWT.decode(await AccessToken.get());

        if(typeof token === "string") return;

        return {
            id: token.id,
            username: token.username,
            deviceid: token.deviceid,
        };
    } 
}