import Secret from "./Secret";
import SecureStore from "@lib/api/SecureStore";
import KeyExchange from "@lib/api/KeyExchange";
import Safe from "@lib/api/Safe";

export default class EncryptionKey {
    public static async generate(safeid: string) {
        const secret = await Secret.generate();
        await this.save(safeid, secret);

        return secret;
    }

    public static async save(safeid: string, content: string) {
        return await SecureStore.setItemAsync(`safe_encryption_key_${safeid}`, content);
    }

    public static async getAll(): Promise<{ [safeid: string]: string }> {
        let resp: { [key: string]: string } = {};

        const keycards = await Safe.getAll(true);
        
        await Promise.all(keycards.map(async (keycard) => {
            resp[keycard.safe.id] = await EncryptionKey.get(keycard.safe.id);
        }));

        return resp;
    }

    public static async get(vaultid: string): Promise<string> {
        const key = await SecureStore.getItemAsync(`safe_encryption_key_${vaultid}`);
        if(key) return key;

        await KeyExchange.getAll();
        return await this.get(vaultid);
    }
}