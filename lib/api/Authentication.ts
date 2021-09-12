import * as Device from "expo-device";
import AccessToken from "./AccessToken";
import post from "@lib/fetch/post";
import RSA from "@lib/encryption/RSA";
import PBKDF2 from "@lib/encryption/PBKDF2";
import AES from "@lib/encryption/AES";
import RefreshToken from "./RefreshToken";

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
    public static async register(username: string, email: string, password: string) {
        type ResponseType = {
            message: "confirmation_email_sent";
        };

        const { publicKey, privateKey } = await RSA.generate();

        return await post<ResponseType>("/auth/register", {
            body: JSON.stringify({
                username,
                email,
                password: this.hashPassword(password, email),
                deviceName: Device.modelName,
                deviceType: "MOBILE",
                rsa: {
                    publicKey,
                    privateKey: await AES.encrypt(privateKey, password),
                },
            }),
        });
    }

    private static hashPassword(password: string, salt?: string) {
        // hashing must produce the same output every time, so the salt MUST be the same for both registration and authentication
        return PBKDF2.hash(password, salt || "wault", 512, 1);
    }

    public static async login(email: string, password: string) {
        type ResponseType = {
            message: "Successful authentication!";
            accessToken: string;
            refreshToken: string;
            publicKey: string;
            privateKey: string;
        };

        const { accessToken, refreshToken, publicKey, privateKey, message } = await post<ResponseType>("/auth/login", {
            body: JSON.stringify({
                email,
                password: this.hashPassword(password, email),
                deviceName: Device.modelName,
                deviceType: "MOBILE",
            }),
        });

        await Promise.all([
            AccessToken.save(accessToken),
            RefreshToken.save(refreshToken),
            RSA.savePublicKey(publicKey),
            RSA.savePrivateKey(AES.decrypt(privateKey, password)),
        ]);
        
        return {
            message,
        };
    }

    public static async verifyRegistration(id: string, secret: string) {
        type ResponseType = {
            message: "Successfully verified your email address!";
            accessToken: string;
            refreshToken: string;
            publicKey: string;
            privateKey: string;
        };

        const { message, accessToken, refreshToken, publicKey, privateKey } = await post<ResponseType>("/auth/register/verify", {
            body: JSON.stringify({
                id,
                secret,
            }),
        });

        await Promise.all([
            AccessToken.save(accessToken),
            RefreshToken.save(refreshToken),
            RSA.savePrivateKey(privateKey),
            RSA.savePublicKey(publicKey),
        ]);

        return {
            message,
        };
    }

    /**
     * Checks if the user is logged in on the client side
     * @returns {boolean} `true` if logged in 
     */
    public static async isLoggedIn() {
        const sessionToken = await AccessToken.get();

        return !!sessionToken;
    }
}