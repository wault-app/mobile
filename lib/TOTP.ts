import jsSHA from "jssha";
import { URL } from "react-native-url-polyfill";

export default class TOTP {
    public static get(url: URL, now = new Date().getTime()) {
        if(!url) return "";

        const secret = url.searchParams.get("secret");
        const expiry = parseInt(url.searchParams.get("period")) || 30;
        const length = parseInt(url.searchParams.get("digits")) || 6; 

        const key = this.base32tohex(secret);
        const epoch = Math.round(now / 1000.0);
        const time = this.leftpad(this.dec2hex(Math.floor(epoch / expiry)), 16, "0");
        
        const shaObj = new jsSHA("SHA-1", "HEX");
        shaObj.setHMACKey(key, "HEX");
        shaObj.update(time);
        const hmac = shaObj.getHMAC("HEX");
        
        if (hmac === "KEY MUST BE IN BYTE INCREMENTS") {
            throw new Error("hex key must be in byte increments");
        }

        const offset = this.hex2dec(hmac.substring(hmac.length - 1));

        let otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) + "";
        
        if (otp.length > length) {
            otp = otp.substr(otp.length - length, length);
        } else {
            otp = this.leftpad(otp, length, "0");
        }

        return otp;
    }

    private static base32tohex(base32: string) {
        const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let bits = "";
        let hex = "";
        let val: number;
        let chunk = "";

        for(let i = 0; i < base32.length; i++) {
            val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += this.leftpad(val.toString(2), 5, "0");
        }
        
        for(let i = 0; i < bits.length; i += 4) {
            chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }

        return hex;
    }

    private static leftpad(str: string, len: number, pad: string) {
        if (len + 1 >= str.length) {
            str = Array(len + 1 - str.length).join(pad) + str;
        }
        return str;
    }

    private static dec2hex(s: number) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    }

    private static hex2dec(s: string) {
        return parseInt(s, 16);
    }
}