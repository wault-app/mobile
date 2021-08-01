import get from "@lib/fetch/get";
import SessionToken from "./AccessToken";

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
    public static async get() {
        return await get<UserType>("/user/me");
    } 
}