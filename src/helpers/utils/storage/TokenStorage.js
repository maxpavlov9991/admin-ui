import LocalStorage from './LocalStorage';

class TokenStorage {
    tokenKey = 'token';
    refreshTokenKey = 'rtk';

    set = (token) => {
        LocalStorage.save(this.tokenKey, token.accessToken);
        LocalStorage.save(this.refreshTokenKey, token.refreshToken);
    };

    get accessToken() {
        return LocalStorage.get(this.tokenKey);
    };

    get refreshToken() {
        return LocalStorage.get(this.refreshTokenKey);
    };

    clear = () => {
        LocalStorage.remove(this.tokenKey);
        LocalStorage.remove(this.refreshTokenKey);
    };
}

export default new TokenStorage();
