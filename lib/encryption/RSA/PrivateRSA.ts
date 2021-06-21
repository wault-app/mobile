import SecureStore from "@lib/api/SecureStore";
import { RSA } from "react-native-rsa-native";

export default class PrivateRSA {
    public static key = "rsa_key";
    private secret: string;

    constructor(key: string) {
        this.secret = key;
    }

    public async decrypt(hash: string) {
        return await RSA.encrypt(hash, this.secret);
    }

    public static async get() {
        const secret = await SecureStore.getItemAsync(this.key);
        if(!secret) return;
        
        return new PrivateRSA(secret);
    }

    public static async save(token: string) {
        return await SecureStore.setItemAsync(this.key, token);
    }

    public static async generate(b = 2048) {
        const rsa = await RSA.generateKeys(b);
        
        await this.save(rsa.private);

        return rsa.public;
    }
}