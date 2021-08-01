import * as Device from "expo-device";
import SessionToken from "./AccessToken";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import post from "@lib/fetch/post";
import KeyExchange from "./KeyExchange";
import RSA from "@lib/encryption/RSA";

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
    public static async register(username: string, email: string) {
        type ResponseType = {
            message: "confirmation_email_sent";
        };

        const { publicKey } = await RSA.generate();

        return await post<ResponseType>("/auth/register", {
            body: JSON.stringify({
                username,
                email,
                deviceName: Device.modelName,
                deviceType: "MOBILE",
                rsaKey: publicKey,
            }),
        });
    }

    public static async verifyRegistration(id: string, secret: string) {
        type ResponseType = {
            message: "successful_registration";
            sessionToken: string;
        };

        const { message, sessionToken } = await post<ResponseType>("/auth/register/verify", {
            body: JSON.stringify({
                id,
                secret,
            }),
        });

        console.log({
            message,
            sessionToken,
        });

        await SessionToken.save(sessionToken);

        return {
            message,
        };
    }

    /**
     * Checks if the user is logged in on the client side
     * @returns {boolean} `true` if logged in 
     */
    public static async isLoggedIn() {
        const sessionToken = await SessionToken.get();

        return !!sessionToken;
    }

    /**
     * Invoked when user scans a QR code from the screen of a computer 
     * @param code {string} a public code that is a `cuid` to identify the authentication request
     * @returns a public rsa key, used to encrypt decryption keys  
     */
    public static async scan(code: string) {    
        type ResponseType = {
            message: "remote_auth_successful_scan";
            rsaKey: string;
        };

        return await post<ResponseType>("/auth/remote/scan", {
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
            message: "remote_auth_success",
        };

        // check if there is new keys to be exchanged
        await KeyExchange.getAll();

        // then query all the encryption keys from local storage
        const keys = await EncryptionKey.getAll();
        
        // encrypt the currently stored keys
        const exchanges = await Promise.all(
            Object.keys(keys).map(
                async (key) => ({
                    safeid: key,
                    value: await RSA.encrypt(keys[key], publicKey),
                })
            )
        );

        // create a request towards the server
        return await post<ResponseType>("/auth/remote/send", {
            body: JSON.stringify({
                id: code,
                exchanges,
            }),
        });
    }
}