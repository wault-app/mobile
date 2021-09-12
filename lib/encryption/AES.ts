import CryptoJS from "crypto-js";
import CryptoJSAES from "crypto-js/aes";

const AES = {
    /**
     * Encryptes a given text string with the key derived from the passphrase (given as the second parameter)
     * @param text The data, that we want to encrypt
     * @param key The "passphrase", that we are using as a key
     * @returns An encrypted version of the text given
     */
    encrypt: (text: string, key: string) => {
        return CryptoJSAES.encrypt(text, key).toString();
    },
    /**
     * Decryptes a given hash (first parameter) using the given passphrase (second parameter)
     * @param text The data, that we want to decrypt
     * @param key The key, that we are using to decrypt the data
     * @returns The decrypted version of the hash as an utf8 strings
     */
    decrypt: (text: string, key: string) => {
        if(!text) return;
        return CryptoJSAES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    },
};

export default AES;