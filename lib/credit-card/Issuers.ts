  
const issuers: {
    [key: string]: IssuerType;
} = {
    "mastercard": {
        name: "MasterCard",
        colors: [
            "#f37b26",
            "#fdb731",
        ],
    },
    "visa": {
        name: "Visa",
        colors: [
            "#0f509e",
            "#1399cd",
        ],
    },
    "discover": {
        name: "Discover",
        colors: [
            "#fff",
            "#eee",
        ],
    },
    "amex": {
        name: "American Express",
        colors: [
            "#308c67",
            "#a3f2cf",
        ],
    },
    "jcb": {
        name: "JCB",
        colors: [
            "#939393",
            "#717171",
        ],
    },
    "dinersclub": {
        name: "Dinersclub",
        colors: [
            "#fff",
            "#eee",
        ],
    },
    "maestro": {
        name: "Maestro",
        colors: [
            "#fbfbfb",
            "#e8e9e5",
        ],
    },
    "laser": {
        name: "Laser",
        colors: [
            "#939393",
            "#717171",
        ],
    },
    "unionpay": {
        name: "UnionPay",
        colors: [
            "#939393",
            "#717171",
        ],
    },
    "elo": {
        name: "Elo",
        colors: [
            "#211x18",
            "#aaa7a2",
        ],
    },
    "unknown": {
        name: "Unknown",
        colors: [
            "#999",
            "#999",
        ],
    }
};

export type IssuerType = {
    name: string;
    colors: string[];
};

export default class Issuers {
    public static get(name: string) {
        if(!issuers[name]) {
            return issuers.unknown;
        }

        return issuers[name];
    }
}