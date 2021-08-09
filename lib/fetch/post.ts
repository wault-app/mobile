import get from "./get"

const post = async <T = {}>(input: RequestInfo, init?: RequestInit) => await get<T>(input, { method: "POST", ...init });

export default post;