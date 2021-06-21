import get from "../fetch/get";
import SecureStore from "./SecureStore";
import WrapperError from "@lib/errors/WrapperError";
import { DeviceType } from "./Device";
import KeyExchange from "./KeyExchange";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import AES from "@lib/encryption/AES";
import post from "@lib/fetch/post";

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
    /**
     * Create a new safe and the AES key to every connected device of yours  
     * @param name {string} the name of the safe
     * @returns the content of the newly created safe 
     */
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

        // Then we will send those keys to every associated device
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

    /**
     * Gets all the stored safes but not decrypt them
     * @param force if true we will query it from the server, if false then we only query it from the server if necessary (not stored locally yet)
     * @returns an array of the safes
     */
    private static async load(force: boolean = false): Promise<[ResponseType, WrapperError]> {
        const stored = await this.getFromLocal();

        if (force || !stored) {
            const [response, error] = await get<ResponseType>("/safe/get");
            if (error) return [null, error];

            await SecureStore.setItemAsync("safe_storage", JSON.stringify(response));
            return [response, null];
        }

        return [stored, null];
    }

    /**
     * Gets the all of the safes' content from both `SecureStore` and remote server (optional) 
     * @param force if we should query from the server when we already have data locally
     * @returns an array of decrypted safe
     */
    public static async getAll(force: boolean = false): Promise<[KeycardType[], WrapperError]> {
        const [data, error] = await this.load(force);

        if(error) return [null, error];

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
        })), null];
    }
}