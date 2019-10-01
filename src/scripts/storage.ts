import { IMyGESAuth } from "../types/auth";

function getStorage(): chrome.storage.LocalStorageArea {
    return chrome.storage.local
}

export function set(obj: Object): Promise<void> {
    return new Promise((resolve, reject) => {
        getStorage().set(obj, () => {
            console.log("Storage => L'objet", obj, "à été sauvegarder");
            resolve();
        })
    });
}

export function get<T>(...key: Array<string>): Promise<T> {
    return new Promise((resolve, reject) => {
        getStorage().get(key, (result: T) => {
            console.log("Storage => Valeur recupéré est ", result);
            resolve(result);
        })
    });
}

export async function saveAuth(auth: IMyGESAuth): Promise<void> {
    return await set({auth: auth});
}

export async function retrieveAuth(): Promise<IMyGESAuth> {
    return await get<IMyGESAuth>('auth');
}