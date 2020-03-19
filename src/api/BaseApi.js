import config from '../config/api';
import axios from 'axios';
import TokenStorage from '../helpers/utils/storage/TokenStorage';

const DEPLOYED_MODE = 'localhost';

const API_URL = (typeof process.env.API_URL === 'object') // eslint-disable-line
    ? process.env.API_URL[DEPLOYED_MODE] || null
    : (typeof process.env.API_URL === 'string' ? process.env.API_URL : null);

const FULL_API_URL = API_URL || config.API_URL;

let refreshing = false;

class BaseApi {
    failedRequests = [];

    constructor(endpoint = '') {
        this.endpoint = endpoint;
        this.axios = axios.create({
            baseURL: FULL_API_URL,
        });

        this.initInterceptors();

    }

    initInterceptors = () => {
        this.axios.interceptors.request.use(this.setToken);
        this.axios.interceptors.response.use(f => f, this.checkAuthFailed);
    };


    get = (params = {}, url = this.endpoint) => {
        return this.axios.get(url, { params });
    };


    create = (data, url = this.endpoint) => {
        return this.axios.post(url, data, { params: { id } });
    };


    update = (id, data, url = this.endpoint) => {
        return this.axios.put(url, data, { params: { id } });
    };


    delete = (id, url = this.endpoint) => {
        return this.axios.delete(url, { params: { id } });
    };

    setToken = (config) => {
        const newConfig = {
            ...config,
        };

        if (!newConfig.headers) {
            newConfig.headers = {};
        }

        newConfig.headers['Authorization'] = `Bearer ${TokenStorage.accessToken}`;

        return newConfig;
    };

    checkAuthFailed = (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
            return this.handleUnAuthorize(error);
        }
        if (error.response?.status === 401 && error.config._retry) {
            TokenStorage.clear();
            window.history.pushState({}, '', '/auth');
        }
        return Promise.reject(error);
    };

    handleUnAuthorize = async (error) => {
        const originalRequest = error.config;

        if (refreshing) {
            return new Promise((resolve, reject) => {
                this.failedRequests.push({ resolve, reject });
            }).then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return this.axios(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }
        originalRequest._retry = 'true';
        refreshing = true;
        return new Promise((resolve, reject) => {
            this.axios.get('/auth/refresh', { params: { refresh: TokenStorage.refreshToken } })
                .then(({ data }) => {
                    TokenStorage.set({
                        refreshToken: data.refreshToken,
                        accessToken: data.accessToken,
                    });
                    delete originalRequest._retry;

                    this.processFailedRequests(null, TokenStorage.accessToken);
                    resolve(this.axios(originalRequest));
                })
                .catch((err) => {
                    this.processFailedRequests(err, null);
                    reject(err);
                })
                .then(() => refreshing = false);
        });
    };


    processFailedRequests = (error, token) => {
        this.failedRequests.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else if (token) {
                prom.resolve(token);
            }
        });

        this.failedRequests = [];
    };
}
