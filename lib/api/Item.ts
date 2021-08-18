import post from "../fetch/post";
import EncryptionKey from "../encryption/EncryptionKey";
import AES from "../encryption/AES";
import { EncryptedItemType, ItemType, ItemTypeWithoutID, KeycardType } from "@wault/typings";

export default class Item {
    /**
     * Create a new item on the remote server
     * @param keycard {KeycardType} the safe that you want to add the item to
     * @param item {ItemType} the item that you want to add
     */
    public static async create(keycard: KeycardType, item: ItemTypeWithoutID): Promise<{ message: string; item: ItemType; }> {
        type ResponseType = {
            item: EncryptedItemType;
            message: "successfully_created_item";
        };

        // load the user encryption key
        const userKey = await EncryptionKey.get();

        // decrypt the key for the safe
        const key = AES.decrypt(keycard.secret, userKey);

        // encrypt the given data
        const data = AES.encrypt(JSON.stringify(item), key);

        // send the encrypted data to the server 
        const resp = await post<ResponseType>("/item", {
            body: JSON.stringify({
                safeid: keycard.safe.id,
                data,
            }),
        });

        return {
            message: resp.message,
            item: {
                id: resp.item.id,
                ...item,
            },
        };
    }

    public static async edit(item: ItemType, keycard: KeycardType, newData: ItemTypeWithoutID): Promise<{ message: string; item: ItemType; }> {
        type ResponseType = {
            message: "Item successfully updated!";
            item: EncryptedItemType;
        };

        // load the encryption key and create a new AES instance
        const userKey = await EncryptionKey.get();

        // decrypt the key for the safe
        const key = AES.decrypt(keycard.secret, userKey);

        // encrypt the given data
        const data = AES.encrypt(JSON.stringify(item), key);

        const resp = await post<ResponseType>(`/item/${item.id}`, {
            method: "PUT", 
            body: JSON.stringify({
                data,
            }),
        });

        return {
            message: resp.message,
            item: {
                id: resp.item.id,
                ...newData,
            },
        };
    }

    public static async delete(item: ItemType) {
        type ResponseType = {
            message: "Item successfully deleted!";
        };

        return await post<ResponseType>(`/item/${item.id}`, {
            method: "DELETE", 
        });
    }
}