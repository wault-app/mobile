import post from "@lib/fetch/post";
import EncryptionKey from "@lib/encryption/EncryptionKey";
import get from "@lib/fetch/get";
import RSA from "@lib/encryption/RSA";

export default class KeyExchange {
    /**
     * Queries all key exchange requests from the remote server
     * @returns an array of requests
     */
    public static async getAll() {
        type ResponseType = {
            keyExchanges: ({
                safeId: string;
                value: string;
            })[];
        };

        const privateKey = await RSA.load();

        const resp = await get<ResponseType>("/key-exchange/getAll");

        const data = await Promise.all(
            resp.keyExchanges.map(
                async (exchange) => ({
                    safeid: exchange.safeId,
                    value: await RSA.decrypt(exchange.value, privateKey),
                })
            )
        );

        console.log(resp.keyExchanges.map((e) => e.safeId));

        await Promise.all(data.map(async (el) => {
            await EncryptionKey.save(el.safeid, el.value);
        }));

        return data;
    }
}