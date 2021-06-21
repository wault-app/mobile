export const errors = {
    "unexpected_error": "Something unexpected happened",
    "service_unavailable": "Couldn't reach remote servers",
    "jwt_token_expired": "JWT token expired"
};

export type ErrorType = keyof typeof errors;


export default class WrapperError extends Error {
    public message: ErrorType;
    public data: any

    constructor(message: ErrorType, data?: any) {
        super(message);

        this.message = message;
        this.data = data;
    }
}