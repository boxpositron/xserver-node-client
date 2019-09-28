const rp = require('request-promise-native');

const BASE_URL = 'https://xserver.boxmarshall.com/api';

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class ServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServiceError';
    }
}

class XServerClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    testConnection() {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/`,
                    method: 'GET',
                    json: true,
                    timeout: 15000
                }

                const response = await rp(options);
                resolve(response)

            } catch (e) {
                reject(new ValidationError(e.message));
            }

        })
    }

    queryKey(serialkey) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/query`,
                    method: 'POST',
                    json: true,
                    body: {
                        serialkey
                    },
                    timeout: 15000
                }

                const response = await rp(options);
                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message));
            }
        })
    }

    extendKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    serialkey,
                    days
                } = context;

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/extend`,
                    method: 'POST',
                    body: {
                        serialkey,
                        days
                    },
                    json: true,
                    timeout: 15000
                }

                const response = await rp(options);
                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }


    resetKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    serialkey,
                    email
                } = context;

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/reset`,
                    method: 'POST',
                    body: {
                        serialkey,
                        email
                    },
                    json: true,
                    timeout: 15000
                }

                const response = await rp(options);
                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    listKeys(email) {
        return new Promise(async (resolve, reject) => {
            try {

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/list`,
                    method: 'POST',
                    body: {
                        email
                    },
                    timeout: 15000,
                    json: true
                }

                const response = await rp(options);
                resolve(response);

            } catch (e) {
                reject(new ServiceError(e.message));
            }
        })
    }

    bindDiscord(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    discord,
                    serialkey,
                    days
                } = context;

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/setup-discord`,
                    method: 'POST',
                    body: {
                        discord,
                        serialkey,
                        days
                    },
                    json: true,
                    timeout: 15000

                }

                const response = await rp(options);
                resolve(response);

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    unbindDiscord(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    serialkey,
                    days
                } = context;

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/remove-discord`,
                    method: 'POST',
                    body: {
                        serialkey,
                        days
                    },
                    json: true,
                    timeout: 15000
                }

                const response = await rp(options);
                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    listTiers() {
        return new Promise(async (resolve, reject) => {
            try {

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/list-tiers`,
                    method: 'GET',
                    json: true,
                    timeout: 15000
                }

                const response = await rp(options);
                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    createEternalKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    email,
                    tierHash,
                    familyName,
                    givenName,
                    days,
                    meta
                } = context

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/create`,
                    method: 'POST',
                    json: true,
                    timeout: 15000,
                    body: {
                        email,
                        tierHash,
                        familyName,
                        givenName,
                        days,
                        meta,
                        eternal: true
                    }
                }

                const response = await rp(options);

                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    updateMeta(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    serialkey,
                    meta
                } = context

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/update-meta`,
                    method: 'POST',
                    json: true,
                    timeout: 15000,
                    body: {
                        meta,
                        serialkey
                    }
                }

                const response = await rp(options);

                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    banKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    serialkey,
                    state
                } = context

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/ban`,
                    method: 'POST',
                    json: true,
                    timeout: 15000,
                    body: {
                        serialkey,
                        state
                    }
                }

                const response = await rp(options);

                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }

    createKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    email,
                    tierHash,
                    familyName,
                    givenName,
                    days,
                    meta
                } = context

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/create`,
                    method: 'POST',
                    json: true,
                    timeout: 15000,
                    body: {
                        email,
                        tierHash,
                        familyName,
                        givenName,
                        days,
                        meta
                    }
                }

                const response = await rp(options);

                resolve(response)

            } catch (e) {
                reject(new ServiceError(e.message))
            }
        })
    }
}



module.exports = XServerClient