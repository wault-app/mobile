import post from "@lib/fetch/post";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import get from "@lib/fetch/get";
import RSA from "@lib/encryption/RSA";
import { SafeType } from "./Safe";

export default class KeyExchange {
    /**
     * Queries all key exchange requests from the remote server
     * @returns an array of requests
     */
    public static async getAll() {
        type ResponseType = {
            keyExchanges: ({
                id: string;
                safe: {
                    id: string;
                };
                value: string;
            })[];
        };

        const privateKey = await RSA.load();
        
        const resp = await get<ResponseType>("/key-exchange");

        const data = await Promise.all(
            resp.keyExchanges.map(
                async (exchange) => ({
                    safeid: exchange.safe.id,
                    value: await RSA.decrypt(exchange.value, privateKey),
                })
            )
        );

        await Promise.all(data.map(async (el) => {
            await EncryptionKey.save(el.safeid, el.value);
        }));

        return data;
    }
}