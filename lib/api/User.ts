import get from "@lib/fetch/get";
import { DeviceType } from "./Device";
import { Buffer } from "buffer";
import SessionToken from "./AccessToken";

type SessionTokenType = UserType & {
    device: DeviceType;
};

export type UserType = {
    id: string;
    username: string;
    email: string;
    icon?: IconType;
};

export type IconType = {
    type: "EMOJI" | "IMAGE";
    value: string;
};

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