import get from "../fetch/get";
import post from "../fetch/post";

export type DeviceType = {
    id: string;
    name: string;
    loggedInAt: Date;
    rsaKey: string;
    type: "MOBILE" | "BROWSER" | "DESKTOP";
};

export default class Device {
    public static async getAll() {
        type ResponseType = {
            devices: DeviceType[];
        };

        const [resp, error] = await get<ResponseType>("/device/getAll");

        if(error) throw error;

        return resp;
    }

    public static async logout(device: DeviceType) {
        type ResponseType = {
            message: "successful_remote_logout";
        };

        const [resp, error] = await post<ResponseType>("/device/logout", {
            body: JSON.stringify({
                deviceid: device.id,
            }),
        });

        if(error) throw error; 

        return resp; 
    }
}