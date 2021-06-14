import get from "../fetch/get";
import SecureStore from "./SecureStore";
import WrapperError from "../errors/WrapperError";
import { DeviceType } from "./Device";
import KeyExchange from "./KeyExchange";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import post from "../fetch/post";

export type RoleType = "OWNER" | "WRITER" | "READER";

type KeycardType = {
    id: string;
    role: RoleType;
    safe: {
        id: string;
        name: string;
        items: ({
            id: string;
            data: { [key: string]: string };
        })[];
        keycards: ({
            id: string;
            role: RoleType;
            user: {
                id: string;
                username: string;
                devices: DeviceType[];
            };
        })[];
    }
};

type ResponseType = {
    keycards: KeycardType[];
};

export default class Safe {
    public static async crate(name: string) {
        type ResponseType = {
            message: "successfully_created_safe",
            keycard: KeycardType;
        };

        const [resp, error] = await post<ResponseType>("/safe/create", {
            body: JSON.stringify({
                name,
            }),
        });

        if(error) return [, error];

        // We're generating and storing an encryption key for the safe
        const secret = await EncryptionKey.generate(resp.keycard.safe.id);

        // Then we will send those keys to every associated device (it's only our device because noone had the time to join yet)
        await Promise.all(resp.keycard.safe.keycards.map(async (keycard) => 
            await Promise.all(keycard.user.devices.map(async (device) => 
                await KeyExchange.send(device.id, resp.keycard.safe.id, secret)
            ))
        ));
    }

    /**
     * Loads the data from our local storage
     * @returns an object containing all the keycards
     */
    private static async getFromLocal(): Promise<ResponseType> {
        const data = await SecureStore.getItemAsync("safe_storage");
        if (!data) return;

        return JSON.parse(data);
    }

    private static async load(force: boolean = false): Promise<[ResponseType] | [undefined, WrapperError]> {
        const stored = await this.getFromLocal();

        if (force || !stored) {
            const [response, error] = await get<ResponseType>("/safe/get");
            if (error) return [, error];

            await SecureStore.setItemAsync("safe_storage", JSON.stringify(response));
            return [response];
        }

        return [stored];
    }

    public static async getAll(force: boolean = false): Promise<[KeycardType[]] | [undefined, WrapperError]> {
        const [data, error] = await this.load(force);

        if(error) return [ , error];

        return [await Promise.all(data.keycards.map(async (keycard) => {
            const { safe } = keycard;

            const key = new AES(await EncryptionKey.get(safe.id));

            return {
                ...keycard,
                safe: {
                    ...keycard.safe,
                    items: await Promise.all(keycard.safe.items.map(async (item) => ({
                        ...item,
                        data: await (async () => {
                            const data = await Promise.all(Object.keys(item.data).map(async (objKey) => ({
                                key: objKey,
                                value: await key.decrypt(item.data[objKey]),
                            })))

                            let resp: { [key: string]: string } = {};

                            for(const el of data) {
                                resp[el.key] = el.value;
                            }

                            return resp;
                        })(),
                    }))),
                }
            };
        }))];
    }
}