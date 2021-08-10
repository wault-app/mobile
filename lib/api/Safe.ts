import post from "../fetch/post";
import get from "../fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import Device from "./Device";
import KeyExchange from "./KeyExchange";
import { EncryptedItemType, ItemType } from "./Item";
import RSA from "../encryption/RSA";
import SecureStore from "./SecureStore";

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
    public static async getAll(force: boolean = false): Promise<KeycardType[]> {
        type ResponseType = {
            keycards: EncryptedKeycardType[];
        };

        const loadStored = async () => {
            try {
                return await SecureStore.getItemAsync("stored_keycards_data");
            } catch {

            }
        };

        const stored = await loadStored();

        const decryptKeycards = async (keycards: EncryptedKeycardType[]) => await Promise.all(
            keycards.map(
                async (keycard) => await this.decrypt(keycard),
            )
        );

        if(!stored || force) {
            // query the key exchanges to get all the encryption keys
            await KeyExchange.getAll();

            // query the keycard data from the server
            const resp = await get<ResponseType>("/safe");
            console.log(resp.keycards);

            // store the data from the server insider secure store
            await SecureStore.setItemAsync("stored_keycards_data", JSON.stringify(resp));

            // decrypt all keycard with their corresponding decryption key
            return await decryptKeycards(resp.keycards);
        } else {
            const { keycards } = JSON.parse(stored);

            return await decryptKeycards(keycards);
        }
    }

    private static async decrypt(keycard: EncryptedKeycardType): Promise<KeycardType> {
        try {
            const key = new AES(await EncryptionKey.get(keycard.safe.id));
        
            return {
                ...keycard,
                safe: {
                    ...keycard.safe,
                    name: key.decrypt(keycard.safe.name),
                    items: await Promise.all(
                        keycard.safe.items.map(
                            async (item) => ({
                                ...item,
                                ...JSON.parse(key.decrypt(item.data)),
                            })
                        )
                    ),
                },
            };
        } catch {
            return;
        }
    }

    public static async create(name: string) {
        type ResponseType = {
            message: "keycard_create_success";
            keycard: EncryptedKeycardType;
        };

        // generate encryption key
        const key = await EncryptionKey.generate();

        // encrypt the safe name
        const encryptor = new AES(key);
        const encryptedName = encryptor.encrypt(name);

        // query all of our devices
        const { devices } = await Device.getAll();

        // create the safe on the server
        const { keycard, message } = await post<ResponseType>("/safe", {
            body: JSON.stringify({
                name: encryptedName,
                keyExchanges: await Promise.all(
                    devices.map(
                        async (device) => {
                            const value = await RSA.encrypt(key, device.rsaKey);
                            
                            return {
                                deviceid: device.id,
                                value,
                            };
                        }
                    )
                )
            })
        });

        // save the encryption key to local storage
        await EncryptionKey.save(keycard.safe.id, key);

        // decrypt the remote data
        const decrypted = await this.decrypt(keycard);

        // send back the new keycard object to be stored in a context
        return {
            message,
            keycard: decrypted,
        };
    }
}