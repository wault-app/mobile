import SecureStore from "@lib/api/SecureStore";
import Forge from "node-forge";
import modPow from "react-native-modpow";
import EncryptionKey from "./EncryptionKey";

// optimization (as RSA key generation would freeze the UI)
Forge.jsbn.BigInteger.prototype.modPow = function nativeModPow(e, m) {
    const result = modPow({
        target: this.toString(16),
        value: e.toString(16),
        modifier: m.toString(16)
    })

    return new Forge.jsbn.BigInteger(result, 16)
}

export default class RSA {
    public static async encrypt(text: string, publicKey: string) {
        return await Forge.util.encode64(Forge.pki.publicKeyFromPem(publicKey).encrypt(text, "NONE"));
    }

    public static async decrypt(hash: string, privateKey: string) {
        return await Forge.pki.privateKeyFromPem(privateKey).decrypt(Forge.util.decode64(hash), "NONE");
    }

    public static async getPrivateKey() {
        return await SecureStore.getItemAsync("rsa-private-key");
    }
    
    public static async getPublicKey() {
        return await SecureStore.getItemAsync("rsa-public-key");
    }

    public static async savePrivateKey(privateKey: string) {
        return await SecureStore.setItemAsync("rsa-private-key", privateKey);
    }

    public static async savePublicKey(publicKey: string) {
        return await SecureStore.setItemAsync("rsa-public-key", publicKey);
    }

    public static async generate(bits: number = 1024): Promise<{ publicKey: string; privateKey: string }> {
        return new Promise(async (resolve, reject) => {
            Forge.pki.rsa.generateKeyPair({
                bits,
                workers: -1,
            }, async (err, keys) => {
                if (err) reject(err);

                const [publicKey, privateKey] = [
                    Forge.pki.publicKeyToPem(keys.publicKey),
                    Forge.pki.privateKeyToPem(keys.privateKey),
                ];

                await Promise.all([
                    this.savePrivateKey(privateKey),
                    this.savePublicKey(publicKey),
                ]);

                resolve({
                    publicKey,
                    privateKey
                });
            });

        });
    }
}