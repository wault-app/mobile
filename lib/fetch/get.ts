import WrapperError, { errors } from "@lib/errors/WrapperError";
import RefreshToken from "@lib/api/RefreshToken";
import AccessToken from "@lib/api/AccessToken";

export const API_ENDPOINT = "https://wault.app/api";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<[T, WrapperError]> => {
    try {
        console.log(`${API_ENDPOINT}${input}`);
        const resp = await fetch(`${API_ENDPOINT}${input}`, {
            ...init,
            headers: {
                "Accept": "application/json",
                "Content-Type": "text/plain",
                ...init.headers,
                Authorization: `Bearer ${await AccessToken.get()}`
            }
        });
        
        if(!resp.ok) throw new WrapperError("service_unavailable");

        const data = await resp.json();
        console.log(data);
        if(data.error) {
            if(data.message in errors) throw new WrapperError(data.message);
            else throw new WrapperError("unexpected_error"); 
        }

        return [data, null];
    } catch(e) {
        if(e instanceof WrapperError && e.message === "jwt_token_expired") {
            await RefreshToken.refresh();
            return await get(input, init);
        } else {
            return [null, e];
        }
    }
};

export default get;