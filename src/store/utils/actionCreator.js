export default (moduleName) => (method, actionName, customHandle = null) => {
    const action = (payload) => ({
        type: method ? `${moduleName}/${actionName}/${method}` : `${moduleName}/${actionName}`,
        payload,
    });

    return customHandle || action;
}

export const BASE_ACTIONS = {
    BASE: '',
    SET: 'set',
    RESET: 'reset',
    SUCCESS: 'success',
    FAIL: 'fail',
};
