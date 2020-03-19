export const isEqual = (obj1, obj2) => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;
    const keys = Object.keys(obj1);
    for (let i = 0; i < keys.length; i++) {
        if (obj1[keys[i]] === null) {
            if (obj2[keys[i]] !== null) {
                return false
            }
        }
        else if (typeof obj1[keys[i]] === 'object') {
            let status = isEqual(obj1[keys[i]], obj2[keys[i]]);
            if (!status)
                return false
        }
        else if (obj1[keys[i]] !== obj2[keys[i]]) {
            return false
        }
    }
    return true
};
