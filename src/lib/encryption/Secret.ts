import * as Random from 'expo-random';

export default class Secret {
    public static async generate(bytes = 2048) {
        return (await Random.getRandomBytesAsync(bytes)).toString();
    }
}