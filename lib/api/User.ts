import { SessionTokenType } from "@wault/typings";
import { Buffer } from "buffer";
import SessionToken from "./AccessToken";

export default class User {
    /**
     * Loads the user from the stored `access_token`
     * @returns an object containing data about the user
     */
    public static async get(): Promise<SessionTokenType> {
        const sessionToken = await SessionToken.get();

        if(!sessionToken) return null;

        return JSON.parse(Buffer.from(sessionToken, "base64").toString("utf8"));
    } 
}