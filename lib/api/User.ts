import AccessToken from "./AccessToken";
import decode from "jwt-decode";
import { AccessTokenType } from "@wault/typings";

export default class User {
    /**
     * Loads the user from the stored `access_token`
     * @returns an object containing data about the user
     */
    public static async get(): Promise<AccessTokenType> {
        const accessToken = await AccessToken.get();
        if(!accessToken) return null;

        return decode(accessToken);
    } 
}