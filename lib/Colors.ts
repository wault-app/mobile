export default class Colors {
    public static rgbToHex(rgb: string) {
        // create a string of a number with leading zeros
        const pad = (num: string, size: number) => String(num).padStart(size, '0');

        // extract rgb values
        let s = rgb;
        s = s.substring(s.indexOf("(") + 1);
        s = s.substring(0, s.indexOf(")"));

        // generate hex
        const hex = `#${s.split(", ").map((el) => pad(parseInt(el).toString(16), 2)).join("")}`;

        return hex;
    }
}