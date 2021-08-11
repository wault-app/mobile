import SessionToken from "@lib/api/AccessToken";
import ServerSelector from "@lib/ServerSelector";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const API_ENDPOINT = await ServerSelector.get();

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
    if (!resp.ok) throw new Error(data.message);

    return data;
};

export default get;