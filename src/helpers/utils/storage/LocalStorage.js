class LocalStorage {
    constructor(storage) {
        this.storage = storage;
    }

    save = (key, value) => {
        this.storage.setItem(key, value);
    };

    get = (key) => {
        return this.storage.getItem(key);
    };


    remove = (key) => {
        this.storage.removeItem(key);
    };


    clear = () => {
        this.storage.clear();
    };
}

export default new LocalStorage(localStorage);
