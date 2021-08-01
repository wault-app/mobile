import WrapperError, { errors } from "@wault/error";
import SessionToken from "@lib/api/AccessToken";

export const API_ENDPOINT = "https://api.wault.app";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
        console.log(`${API_ENDPOINT}${input}`);
        const resp = await fetch(`${API_ENDPOINT}${input}`, {
            ...init,
            headers: {
                "Accept": "application/json",
                "Content-Type": "text/plain",
                ...init?.headers,
                "Authorization": `Bearer ${await SessionToken.get()}`
            }
        });

        if(!resp.ok) throw new WrapperError("service_unavailable");

        const data = await resp.json();
        if(data.error) {
            if(data.message in errors) throw new WrapperError(data.name);
            else throw new WrapperError("unexpected_error"); 
        }

        console.log(data);

        return data;
};

export default get;