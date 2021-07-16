import get from "../fetch/get";
import SecureStore from "./SecureStore";
import WrapperError from "@lib/errors/WrapperError";
import KeyExchange from "./KeyExchange";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import AES from "@lib/encryption/AES";
import post from "@lib/fetch/post";
import { EncryptedItemType, ItemType } from "./Item";
import Device from "./Device";
import RSA from "@lib/encryption/RSA";

export type RoleType = "OWNER" | "WRITER" | "READER";

export type SafeType = {
    id: string;
    name: string;
    items: ItemType[];
};

export type KeycardType = {
    id: string;
    safe: SafeType;
    role: RoleType;
};

type EncryptedSafeType = {
    id: string;
    name: string;
    items: EncryptedItemType[];
};

type EncryptedKeycardType = {
    id: string;
    safe: EncryptedSafeType;
    role: RoleType;
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

        const [{ keycard }, error] = await post<ResponseType>("/safe/create", {
            body: JSON.stringify({
                name,
            }),
        });

        if (error) throw error;

        // We're generating and storing an encryption key for the safe
        const secret = await EncryptionKey.generate(keycard.safe.id);

        // query all of our devices
        const { devices } = await Device.getAll();

        // send the new encryption key to all device
        await Promise.all(
            devices.map(
                async (device) => {
                    return await KeyExchange.send(
                        keycard.safe.id,
                        device.id,
                        await RSA.encrypt(secret, device.rsaKey),
                    );
                }
            )
        );

    }

    /**
     * Loads the data from our local storage
     * @returns an object containing all the keycards
     */
    private static async getFromLocal(): Promise<EncryptedKeycardType[]> {
        const data = await SecureStore.getItemAsync("safe_storage");
        if (!data) return;

        return JSON.parse(data);
    }

    /**
     * Gets all the stored safes but not decrypt them
     * @param force if true we will query it from the server, if false then we only query it from the server if necessary (not stored locally yet)
     * @returns an array of the safes
     */
    private static async load(force: boolean = false): Promise<EncryptedKeycardType[]> {
        const stored = await this.getFromLocal();

        if (force || !stored) {
            const [{ keycards }, error] = await get<{ keycards: EncryptedKeycardType[] }>("/safe/get");
            if (error) throw error;

            await SecureStore.setItemAsync("safe_storage", JSON.stringify(keycards));
            return keycards;
        }

        return stored;
    }

    /**
     * Gets the all of the safes' content from both `SecureStore` and remote server (optional) 
     * @param force if we should query from the server when we already have data locally
     * @returns an array of decrypted safe
     */
    public static async getAll(force: boolean = false): Promise<KeycardType[]> {
        const keycards = await this.load(force);

        return await Promise.all(
            keycards.map(
                async (keycard) => {
                    const secret = await EncryptionKey.get(keycard.safe.id);

                    return {
                        ...keycard,
                        safe: {
                            ...keycard.safe,
                            name: AES.decrypt(keycard.safe.name, secret),
                            items: keycard.safe.items.map(
                                (item) => (
                                    {
                                        ...item,
                                        ...JSON.parse(AES.decrypt(item.data, secret)),
                                    }
                                )
                            )

                        }
                    };
                }
            )
        )
    }
}