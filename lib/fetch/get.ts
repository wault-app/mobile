import AccessToken from "@lib/api/AccessToken";
import RefreshToken from "@lib/api/RefreshToken";
import ServerSelector from "@lib/ServerSelector";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    try {
        const API_ENDPOINT = await ServerSelector.get();

        console.log(`${init?.method || "GET"} ${API_ENDPOINT}${input}`);
        const resp = await fetch(`https://${API_ENDPOINT}${input}`, {
            ...init,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...init?.headers,
                "Authorization": `Bearer ${await AccessToken.get()}`
            }
        });
    
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message);
    
        return data;
    } catch(e) {
        if(e.message === "jwt_token_expired") {
            await RefreshToken.refresh();
            return await get(input, init);
        } else throw e;
    }
};

export default get;