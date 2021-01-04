const Axios = require('axios').default
const { ManagerError } = require('../errors')
const { SafeEncode } = require('../safe-encode')

const BASE_URL = 'https://licenses.railgunsecurity.com/api'

class XServerManager {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.session = Axios.create({
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      baseURL: BASE_URL
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
        let message

        if (e.statusCode >= 500) {
          if (e.response && e.response.body) {
            if (!e.response.body.success) {
              message = e.response.body.error
            }
          } else {
            message = e
          }
        }

        reject(message ? new Error(message) : e)
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
        if (e.response) {
          return reject(new ManagerError(e.response.body.error))
        }

        reject(new ManagerError(e.message))
      }
    })
  }
}

module.exports = {
  XServerManager
}
