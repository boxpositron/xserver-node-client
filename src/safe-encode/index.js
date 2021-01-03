const CryptoJS = require('crypto-js')

class SafeEncode {
  constructor(key) {
    this.key = key
    this.iterations = 100
    this.keySize = 256
    this.ivSize = 128
  }

  generatePayload(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const enc_payload = await this.encode(JSON.stringify(params))
        return resolve(enc_payload)
      } catch (e) {
        return reject(e)
      }
    })
  }

  decodePayload(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const dec_payload = await this.decode(params)
        const payload = JSON.parse(dec_payload.toString(CryptoJS.enc.Utf8))

        return resolve(payload)
      } catch (e) {
        return reject(e)
      }
    })
  }

  /**
   *
   * @param token
   * @returns {Promise}
   */
  encode(token) {
    return new Promise((resolve, reject) => {
      try {
        const salt = CryptoJS.lib.WordArray.random(128 / 8)
        const iv = CryptoJS.lib.WordArray.random(128 / 8)
        const key = CryptoJS.PBKDF2(this.key, salt, {
          keySize: this.keySize / 32,
          iterations: this.iterations
        })

        const enc_cipher = CryptoJS.AES.encrypt(token, key, {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv
        })
        resolve(`${salt.toString()}${iv.toString()}${enc_cipher.toString()}`)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   *
   * @param token
   * @returns {Promise}
   */
  decode(token) {
    return new Promise((resolve, reject) => {
      try {
        const salt = CryptoJS.enc.Hex.parse(token.substr(0, 32))
        const iv = CryptoJS.enc.Hex.parse(token.substr(32, 32))
        const encrypted = token.substring(64)

        const key = CryptoJS.PBKDF2(this.key, salt, {
          keySize: this.keySize / 32,
          iterations: this.iterations
        })

        const dec_cipher = CryptoJS.AES.decrypt(encrypted, key, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })

        resolve(dec_cipher)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = {
  SafeEncode
}
