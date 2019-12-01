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
    /**
     * 
     * @param {string} apiKey - Your generated xserver api key
     */
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

    /**
     * Return all generated license keys
     */
    dumpKeys() {
        return new Promise(async (resolve, reject) => {
            try {

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/dump`,
                    method: 'POST',
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

    /**
     * Query license key
     * @param {string} serialkey - License key
     */
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

    /**
     * Extend the days alloted to a license key
     * @param {Object} context 
     * @param {string} context.serialkey - License key
     * @param {number} context.days - Days to extend
     */
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

    /**
     * Reset the specified license key
     * @param {Object} context 
     * @param {string} context.serialkey - License key
     * @param {string} context.email - License email address
     */
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

    /**
     * List license keys attached to a specified email address
     * @param {string} email - Query email address
     */
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

    /**
     * Attached discord credentials to a license key
     * @param {Object} context 
     * @param {string} context.email - License email
     * @param {string} context.serialkey - License key
     * @param {Object} context.discord
     * @param {string} context.discord.id - Discord id
     * @param {string} context.discord.username - Discord username
     * @param {string} context.discord.discriminator - Discord discriminator
     * @param {string} context.discord.avatar - Discord avatar
     * @param {string} context.discord.isBot - Discord isBot flag
     * @param {string} context.discord.nitro - Discord nitro flag
     * @param {string} context.discord.email - Discord email
     * @param {string} context.discord.emailVerified - Discord email verified flag
     * 
     */
    bindDiscord(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    discord,
                    serialkey,
                    email
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
                        email
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

    /**
     * Remove discord credentials from a license key
     * @param {Object} context 
     * @param {string} context.serialkey - License key
     * @param {string} context.email - Purchase email
     */
    unbindDiscord(context) {
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
                    url: `${BASE_URL}/manage/remove-discord`,
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

    /**
     * List available tiers
     */
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

    /**
     * Create an eternal license key
     * @param {Object} context 
     * @param {string} context.email - License email
     * @param {string} context.tierHash - Plan tier hash
     * @param {string} context.familyName - Owner family name
     * @param {string} context.givenName - Owner given name
     * @param {number} context.days [0] - Active days
     * @param {Object[]} context.meta - Attached meta information
     */
    createEternalKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    email,
                    tierHash,
                    familyName,
                    givenName,
                    days = 0,
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

    /**
     * Update attached meta information
     * @param {Object} context 
     * @param {string} context.serialkey - License key
     * @param {Object[]} context.meta - Attached meta information
     */
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

    /**
     * Ban license key
     * @param {Object} context 
     * @param {string} context.serialkey - License key
     * @param {boolean} context.state [true] - Ban state
     */
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

    /**
     * Create license key
     * @param {Object} context 
     * @param {string} context.email - License email
     * @param {string} context.tierHash - Plan tier hash
     * @param {string} context.familyName - Owner family name
     * @param {string} context.givenName - Owner given name
     * @param {number} context.days [1] - Active duration
     * @param {Object[]} context.meta - Attached meta information
     */
    createKey(context) {
        return new Promise(async (resolve, reject) => {
            try {

                const {
                    email,
                    tierHash,
                    familyName,
                    givenName,
                    days = 1,
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

    /**
     * Transfer serial key to new purchase email
     * @param {object} context Purchase email transfer payload
     * @param {string} context.email Purchase email being transferred from
     * @param {string} context.serialkey Serial key up for transfer
     */
    beginTransfer(context) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    email,
                    serialkey
                } = context;

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/begintransfer`,
                    method: 'POST',
                    json: true,
                    timeout: 15000,
                    body: {
                        serialkey,
                        email
                    }
                }

                const response = await rp(options);

                return resolve(response);

            } catch (e) {
                return reject(e)
            }
        })
    }

    /**
     * Complete purchase email transfer for serial key
     * @param {object} context Transfer confirmation payload
     * @param {string} context.email Email address being transferred to
     * @param {string} context.transferCode Authorization code for transfer
     * @param {string} context.serialkey Serial key up for transfer
     * @param {string} context.givenName Target givenName
     * @param {string} context.familyName Target familyName
     */
    confirmTransfer(context) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    email,
                    givenName,
                    familyName,
                    serialkey,
                    transferCode
                } = context;

                const options = {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                    url: `${BASE_URL}/manage/confirmtransfer`,
                    method: 'POST',
                    json: true,
                    timeout: 15000,
                    body: {
                        givenName,
                        familyName,
                        email,
                        serialkey,
                        transferCode
                    }
                }

                const response = await rp(options);

                return resolve(response);

            } catch (e) {
                return reject(e)
            }
        })
    }
}



module.exports = XServerClient