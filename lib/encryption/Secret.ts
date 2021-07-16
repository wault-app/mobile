import * as Random from 'expo-random';

export default class Secret {
    public static async generate(bytes = 1024): Promise<string> {
        const array = await Random.getRandomBytesAsync(bytes);

        return Array.from(array).map((value) => value.toString(16)).join("");
    }
}