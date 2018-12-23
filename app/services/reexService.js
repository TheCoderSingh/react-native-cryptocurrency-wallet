import baseServiceReex from './baseServiceReex'

var reexService = {

  sendMoney: (amount, reference, currency, account) => {
    var data = {
      amount,
      reference,
      account,
    }
    return baseServiceReex.post('spendCoins/', data)
  },

  getWallet: (id, email) => {
    return baseServiceReex.get(`wallets/${id}/${email}/`)
  },

  getBalance: (id, email) => {
    return baseServiceReex.get(`getbalance/${id}/${email}/`)
  },

  setUsername: (username) => {
    var data = {
      username,
    }
    return baseServiceReex.post('user/username/set/', data)
  },

  createWallet: (id, email) => {
    var data = {
      id,
      email
    }
    return baseServiceReex.post('create', data)
  },
}

export default reexService
