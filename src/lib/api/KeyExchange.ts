import PrivateRSA from "../encryption/RSA/PrivateRSA";
import post from "../fetch/post";
import EncryptionKey from "../encryption/EncryptionKey";
import get from "../fetch/get";

export default class KeyExchange {
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