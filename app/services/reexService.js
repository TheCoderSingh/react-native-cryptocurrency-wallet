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

  createWallet: (id, email) => {
    var data = {
      id,
      email
    }
    return baseServiceReex.post('create', data)
  },

  exportPrivateKey: (code) => {
    var data = {
      code
    }

    return baseServiceReex.post('exportPrivKey', data)
  },
}

export default reexService
