import RefreshToken from "./RefreshToken";
import * as Device from "expo-device";
import PrivateRSA from "../encryption/RSA/PrivateRSA";
import AccessToken from "./AccessToken";
import EncryptionKey from "../encryption/EncryptionKey";
import PublicRSA from "../encryption/RSA/PublicRSA";
import post from "../fetch/post";

export default class Authentication {
    public static async register(username: string) {
        type ResponseType = {
            message: "successful_registration";
            accessToken: string;
            refreshToken: string;
        };

        const [data, error] = await post<ResponseType>("/auth/register", {
            body: JSON.stringify({
                username,
                deviceName: Device.modelName,
                rsaKey: await PrivateRSA.generate(),
            }),
        });

        if(!error) {
            await Promise.all([
                AccessToken.save(data.accessToken),
                RefreshToken.save(data.refreshToken),
            ]);
        }

        return [data, error];
    }

    public static async scan(code: string) {    
        type ResponseType = {
            message: "successfully_scanned_authentication_code";
            rsa: string;
        };

        return await post<ResponseType>("/auth/qr/scan", {
            body: JSON.stringify({
                id: code,
            }),
        });
    }

    public static async send(code: string, publicKey: string) {
        type ResponseType = {
            message: "successfully_sent_authentication_data",
        };

        const [keys, error] = await EncryptionKey.getAll();
        if(error) return [, error];

        const rsa = new PublicRSA(publicKey);

        const encryptedKeys = await Promise.all(Object.keys(keys).map(async (key) => ({
            safeid: key,
            content: await rsa.encrypt(keys[key]),
        })));

        return await post<ResponseType>("/auth/qr/send", {
            body: JSON.stringify({
                id: code,
                keys: encryptedKeys,
            }),
        });
    }
}