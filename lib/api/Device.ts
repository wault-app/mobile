import get from "../fetch/get";
import post from "../fetch/post";
import { UserType } from "./User";

export type DeviceType = {
    id: string;
    name: string;
    loggedInAt: string;
    rsaKey: string;
    type: "MOBILE" | "WEB" | "DESKTOP" | "CLI";
};

export default class Device {
    public static async getAll() {
        type ResponseType = {
            devices: DeviceType[];
        };

        return await get<ResponseType>("/device/getAll");
    }

    public static async get() {
        type ResponseType = {
            device: DeviceType & {
                user: UserType;
            };
        };

        return await get<ResponseType>("/device/get");
    }

    public static async logout({ id }: DeviceType) {
        type ResponseType = {
            message: "successful_logout";
        };

        return await post<ResponseType>("/device/logout", {
            body: JSON.stringify({
                id,
            }),
        }); 
    }
}