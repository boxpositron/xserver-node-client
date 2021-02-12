const Axios = require('axios').default
const { ManagerError } = require('../errors')
const { SafeEncode } = require('../safe-encode')

const BASE_URL = 'https://licenses.railgunsecurity.com/api'

class XServerManager {
  constructor(apiKey, baseUrl = null) {
    this.apiKey = apiKey
    this.session = Axios.create({
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      baseURL: baseUrl ? baseUrl : BASE_URL
    })
  }

  generateEncoder(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenVariation = `${data}`.substr(
          data.length - 6,
          data.length - 1
        )
        const accessToken = `${data}`.substr(0, data.length - 6)

        const machineToken = await this.fetchMachineToken(accessToken)
        const seckey = `${machineToken}${tokenVariation}`
        const encoder = new SafeEncode(seckey)
        resolve({ encoder, machineToken })
      } catch (e) {
        reject(e)
      }
    })
  }

  fetchMachineToken(accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        const machineToken = await this.getID({
          accessToken
        })

        const { token = '' } = machineToken

        if (!token || !token.length) throw new Error('No token available')

        resolve(token)
      } catch (e) {
        if (e.request) {
          return reject(new ManagerError(e.request.data.error || e.message))
        }

        if (e.response) {
          return reject(new ManagerError(e.response.data.error || e.message))
        }

        reject(new ManagerError(e.message))
      }
    })
  }

  getID({ accessToken }) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          url: `v2/ping-base/get-id`,
          method: 'POST',
          data: {
            accessToken
          }
        }

        const { data } = await this.session(options)

        resolve(data)
      } catch (e) {
        if (e.request) {
          return reject(new ManagerError(e.request.data.error || e.message))
        }

        if (e.response) {
          return reject(new ManagerError(e.response.data.error || e.message))
        }

        reject(new ManagerError(e.message))
      }
    })
  }

  validateCat({ cat }) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          url: `v2/ping-base/validate-cat`,
          method: 'POST',
          data: {
            cat
          }
        }

        const { data } = await this.session(options)

        resolve(data)
      } catch (e) {
        if (e.response) {
          return reject(new ManagerError(e.response.data.error || e.message))
        }

        if (e.response) {
          return reject(new ManagerError(e.response.data.error || e.message))
        }

        return reject(new ManagerError(e.message))
      }
    })
  }
}

module.exports = {
  XServerManager
}
