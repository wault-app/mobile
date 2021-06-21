import { RSA } from "react-native-rsa-native";

export default class PublicRSA {
    private key: string;

    constructor(publicKey: string) {
        this.key = publicKey;
    }

    public encrypt(text: string) {
        return RSA.encrypt(text, this.key);
    }
}