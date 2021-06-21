import get from "./get"

const post = async <T = {}>(input: RequestInfo, init?: RequestInit) => await get<T>(input, { ...init, method: "POST" });

export default post;