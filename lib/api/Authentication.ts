import RefreshToken from "./RefreshToken";
import * as Device from "expo-device";
import PrivateRSA from "@lib/encryption/RSA/PrivateRSA";
import AccessToken from "./AccessToken";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import PublicRSA from "@lib/encryption/RSA/PublicRSA";
import post from "@lib/fetch/post";

/**
 * A library used to handle authentication chores between the REST API and the mobile application.
 */
export default class Authentication {
    /**
     * Creates a new user in the database and returns an `access_token` and `refresh_token` for authentication.
     * @throws error when the username is already taken
     * @throws error when invalid POST body is sent  
     * @param username {string}  the username that the user want to reserve
     * @returns an `access_token`, a `refresh_token` and a message
     */
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

    /**
     * Checks if the user is logged in on the client side
     * @returns {boolean} `true` if logged in 
     */
    public static async isLoggedIn() {
        const [accessToken, refreshToken] = await Promise.all([
            AccessToken.get(),
            RefreshToken.get(), 
        ]);

        return !!accessToken && !!refreshToken;
    }

    /**
     * Invoked when user scans a QR code from the screen of a computer 
     * @param code {string} a public code that is a `cuid` to identify the authentication request
     * @returns a public rsa key, used to encrypt decryption keys  
     */
    public static async scan(code: string) {    
        type ResponseType = {
            message: "successfully_scanned_authentication_code";
            rsa: string;
            username: string;
        };

        return await post<ResponseType>("/auth/qr/scan", {
            body: JSON.stringify({
                id: code,
            }),
        });
    }

    /**
     * Sends the encryption keys to the server (in an encrypted form) 
     * @param code the `cuid`, that the user previously scanned
     * @param publicKey the `RSA` key used to encrypt the keys
     * @returns a message saying successful communication
     */
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