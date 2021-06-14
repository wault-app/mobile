import SecureStore from "../../api/SecureStore";
import NodeRSA from "node-rsa";

export default class PrivateRSA {
    public static key = "rsa_key";
    private secret: NodeRSA;

    constructor(key: string) {
        this.secret = new NodeRSA(key);
    }

    public async decrypt(hash: string) {
        return await this.secret.decrypt(hash, "utf8");
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
        const rsa = new NodeRSA({ b });

        await this.save(rsa.exportKey());

        return rsa.exportKey("public");
    }
}