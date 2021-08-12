import get from "../fetch/get";
import post from "../fetch/post";
import { DeviceType } from "@wault/typings";

export default class Device {
    public static async getAll() {
        type ResponseType = {
            devices: DeviceType[];
        };

        return await get<ResponseType>("/device");
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