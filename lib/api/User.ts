import AccessToken from "./AccessToken";
import jwt_decode from "jwt-decode";

export type UserType = {
    id: string;
    username: string;
    deviceid: string;
};

export default class User {
    /**
     * Loads the user from the stored `access_token`
     * @returns an object containing data about the user
     */
    public static async load(): Promise<UserType> {
        const token = jwt_decode<UserType>(await AccessToken.get());

        if(typeof token === "string") return;

        return {
            id: token.id,
            username: token.username,
            deviceid: token.deviceid,
        };
    } 
}