import WrapperError, { errors } from "../errors/WrapperError";
import RefreshToken from "../api/RefreshToken";
import AccessToken from "../api/AccessToken";

export const API_ENDPOINT = __DEV__ ? "https://localhost:3000/api" : "https://wault.app/api";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<[T] | [undefined, WrapperError]> => {
    try {
        const resp = await fetch(`${API_ENDPOINT}${input}`, {
            ...init,
            headers: {
                ...init.headers,
                Authorization: `Bearer ${await AccessToken.get()}`
            }
        });
        
        if(!resp.ok) throw new WrapperError("service_unavailable");

        const data = await resp.json();
        if(data.error) {
            if(data.message in errors) throw new WrapperError(data.message);
            else throw new WrapperError("unexpected_error"); 
        }

        return [data];
    } catch(e) {
        if(e instanceof WrapperError && e.message === "jwt_token_expired") {
            await RefreshToken.refresh();
            return await get(input, init);
        } else {
            return [undefined, e];
        }
    }
};

export default get;