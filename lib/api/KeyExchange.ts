import PrivateRSA from "@lib/encryption/RSA/PrivateRSA";
import post from "@lib/fetch/post";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import get from "@lib/fetch/get";

export default class KeyExchange {
    /**
     * Queries all key exchange requests from the remote server
     * @returns an array of requests
     */
    public static async getAll() {
        type ResponseType = {
            exchanges: ({
                safeid: string;
                content: string;
            })[];
        };

        const key = await PrivateRSA.get();

        const [resp, error] = await get<ResponseType>("/key-exchanges/get");

        if(error) return [, error];

        const data = await Promise.all(resp.exchanges.map(async (exchange) => ({
            safeid: exchange.safeid,
            content: await key.decrypt(exchange.content),
        })));

        await Promise.all(data.map(async (el) => {
            await EncryptionKey.save(el.safeid, el.content);
        }));

        return [data];
    }

    /**
     * Sends the rsa-encrypted(!) key to the remote server  
     * @param deviceid to which device we want to send the key
     * @param safeid for which safe the key should be used for
     * @param content the encrypted key for the safe
     * @returns a message saying successfuly key exchange
     */
    public static async send(deviceid: string, safeid: string, content: string) {
        type ResponseType = {
            message: "successfully_sent_key_exchange",
        };

        return await post<ResponseType>("/key-exchanges/send", {
            body: JSON.stringify({
                deviceid,
                safeid,
                content,
            }),
        });
    }
}