import post from "../fetch/post";
import get from "../fetch/get";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import Device from "./Device";
import RSA from "../encryption/RSA";
import SecureStore from "./SecureStore";
import { EncryptedKeycardType, KeycardType } from "@wault/typings";
import Secret from "@lib/encryption/Secret";

export default class Safe {
    public static async getAll(force: boolean = false): Promise<KeycardType[]> {
        type ResponseType = {
            keycards: EncryptedKeycardType[];
        };

        const loadLocal = async () => {
            return await SecureStore.getItemAsync("stored_keycards_data");
        };

        const saveLocal = async (data: string) => {
            return await SecureStore.setItemAsync("stored_keycards_data", data);
        };

        const stored = await loadLocal();

        const decryptKeycards = async (keycards: EncryptedKeycardType[]) => await Promise.all(
            keycards.map(
                async (keycard) => await this.decrypt(keycard),
            )
        );

        if(!stored || force) {
            // query the keycard data from the server
            const resp = await get<ResponseType>("/safe");
            
            // store the data from the server insider secure store
            await saveLocal(JSON.stringify(resp));

            // decrypt all keycard with their corresponding decryption key
            return await decryptKeycards(resp.keycards);
        } else {
            const { keycards } = JSON.parse(stored);

            return await decryptKeycards(keycards);
        }
    }

    private static async decrypt(keycard: EncryptedKeycardType): Promise<KeycardType> {
        try {
            const userKey = await EncryptionKey.get();

            const key = AES.decrypt(keycard.secret, userKey);

            const aes = new AES(key);

            console.log(keycard);
        
            return {
                ...keycard,
                safe: {
                    ...keycard.safe,
                    name: aes.decrypt(keycard.safe.name),
                    description: aes.decrypt(keycard.safe.description),
                    items: await Promise.all(
                        keycard.safe.items.map(
                            async (item) => ({
                                ...item,
                                ...JSON.parse(aes.decrypt(item.data)),
                            })
                        )
                    ),
                },
            };
        } catch {
            return;
        }
    }

    public static async create(name: string, description?: string) {
        type ResponseType = {
            message: "keycard_create_success";
            keycard: EncryptedKeycardType;
        };

        // get user's encryption key
        const key = await EncryptionKey.get();

        // generate a secret for the safe
        const secret = await Secret.generate();

        // create the safe on the server
        const { keycard, message } = await post<ResponseType>("/safe", {
            body: JSON.stringify({
                // safe related information
                name: AES.encrypt(name, secret),
                description: AES.encrypt(description, secret),
                
                // keycard realted information
                secret: AES.encrypt(secret, key),
            })
        });

        // decrypt the remote data
        const decrypted = await this.decrypt(keycard);

        // send back the new keycard object to be stored in a context
        return {
            message,
            keycard: decrypted,
        };
    }
}