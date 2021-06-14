import * as ExpoSecureStore from "expo-secure-store";

type IndexStorageType  = {
    blocks: number;
};

/**
 * A wrapper class for `expo-secure-store` implementing storage for more then 2048 bytes
 */
export default class SecureStore {
    public static async isAvailableAsync() {
        return await ExpoSecureStore.isAvailableAsync();
    }

    public static async deleteItemAsync(key: string) {
        const index = await this.getIndex(key);
        if(!index) return;
        
        const blocksCounter = index.blocks;

        const blockIds = [];
        for(let i = 0; i < blocksCounter; i++) {
            blockIds.push(i);
        }

        await ExpoSecureStore.deleteItemAsync(`${key}_index`);
        await Promise.all(blockIds.map((index) => ExpoSecureStore.deleteItemAsync(`${key}_block_${index}`)));
    }

    private static async getIndex(key: string) {
        const stored = await ExpoSecureStore.getItemAsync(`${key}_index`);
        if(!stored) return; 
        const data: IndexStorageType = JSON.parse(stored);
        return data;
    }

    public static async getItemAsync(key: string): Promise<string | null> {
        const index = await this.getIndex(key);
        if(!index) return;

        const blocksCounter = index.blocks;

        const blockIds = [];
        for(let i = 0; i < blocksCounter; i++) {
            blockIds.push(i);
        }

        const data = await Promise.all(blockIds.map((index) => ExpoSecureStore.getItemAsync(`${key}_block_${index}`)))

        return data.join("");
    }

    public static async setItemAsync(key: string, value: string) {
        await this.deleteItemAsync(key);
        
        const blockSize = 512;
        const numberOfBlocks = Math.ceil(value.length / blockSize);

        const blocks: string[] = [];
    
        for(let i = 0; i < numberOfBlocks; i++) {
            blocks.push(value.substr(i * blockSize, blockSize));
        }

        const index: IndexStorageType = {
            blocks: numberOfBlocks,
        };

        await ExpoSecureStore.setItemAsync(`${key}_index`, JSON.stringify(index));
        await Promise.all(blocks.map(async (block, index) => await ExpoSecureStore.setItemAsync(`${key}_block_${index}`, block)));
    }
}