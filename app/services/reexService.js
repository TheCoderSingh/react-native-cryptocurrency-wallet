import baseServiceReex from './baseServiceReex'

var reexService = {

  sendMoney: (walletId, email, userId, address, amount) => {
    var data = {
      Id: walletId,
      Email: email,
      UserId: userId,
      ToAddress: address,
      transferValue: amount
    }
    return baseServiceReex.post('spendCoins/', data)
  },

  getWallet: (id, email) => {
    return baseServiceReex.get(`wallets/${id}/${email}/`)
  },

  getBalance: (id, email) => {
    return baseServiceReex.get(`getbalance/${id}/${email}/`)
  },

  getTransactions: (id, email, from, count) => {
    return baseServiceReex.get(`transactions/${id}/${email}/${from}/${count}/`)
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
