import CryptoJS from "crypto-js";
import CryptoJSAES from "crypto-js/aes";

export default class AES {
    private key: string;

    constructor(secret: string) {
        this.key = secret;
    }

    public static encrypt(text: string, secret: string) {
        return CryptoJSAES.encrypt(text, secret).toString();
    }

    public static decrypt(hash: string, secret: string) {
        return CryptoJSAES.decrypt(hash, secret).toString(CryptoJS.enc.Utf8);
    }

    public encrypt(text: string) {
        return CryptoJSAES.encrypt(text, this.key).toString();
    }

    public decrypt(hash: string) {
        return CryptoJSAES.decrypt(hash, this.key).toString(CryptoJS.enc.Utf8);
    }
}