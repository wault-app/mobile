import Secret from "./Secret";
import SecureStore from "@lib/api/SecureStore";
import KeyExchange from "@lib/api/KeyExchange";
import Safe from "@lib/api/Safe";
import WrapperError from "@lib/errors/WrapperError";

export default class EncryptionKey {
    public static async generate(safeid: string) {
        const secret = await Secret.generate();
        await this.save(safeid, secret);

        return secret;
    }

    public static async save(safeid: string, content: string) {
        return await SecureStore.setItemAsync(`vault_encryption_key_${safeid}`, content);
    }

    public static async getAll(): Promise<[{ [key: string]: string }] | [undefined, WrapperError]> {
        let resp: { [key: string]: string } = {};

        const [keycards, error] = await Safe.getAll();
        if(error) return [, error];

        await Promise.all(keycards.map(async (keycard) => {
            resp[keycard.safe.id] = await EncryptionKey.get(keycard.safe.id);
        }));

        return [resp];
    }

    public static async get(vaultid: string): Promise<string> {
        const key = await SecureStore.getItemAsync(`vault_encryption_key_${vaultid}`);
        if(key) return key;

        await KeyExchange.getAll()
        return await this.get(vaultid);
    }
}