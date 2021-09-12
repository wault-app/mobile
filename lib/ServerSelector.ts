import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ServerSelector {
    public static defaultServer = "wault.herokuapp.com";
    private static key = "server_selector_value";

    public static async get() {
        const userSetServer = await AsyncStorage.getItem(this.key);
    
        return userSetServer || this.defaultServer;
    }

    public static async set(server: string) {
        await AsyncStorage.setItem(this.key, server);
    }
}