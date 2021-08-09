import WrapperError, { errors } from "@wault/error";
import SessionToken from "@lib/api/AccessToken";

export const API_ENDPOINT = "https://server.wault.app";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
        console.log(`${init?.method || "GET"} ${API_ENDPOINT}${input}`);
        const resp = await fetch(`${API_ENDPOINT}${input}`, {
            ...init,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...init?.headers,
                "Authorization": `Bearer ${await SessionToken.get()}`
            }
        });

        const data = await resp.json();
        if(!resp.ok) throw new Error(data.message);

        return data;
};

export default get;