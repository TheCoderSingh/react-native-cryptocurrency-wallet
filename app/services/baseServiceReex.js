import { AsyncStorage, Alert } from 'react-native'

import Constants from '../config/constants'
const baseUrl = Constants.reex_service_url

let getHeaders = async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }
  }
  else {
    return {
      'Content-Type': 'application/json',
    }
  }
}

let _apiCallWithData = async (url, method, data) => {
  try {
    let headers = await getHeaders()
    let response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
      credentials: 'omit',
    })
    if (response.status === 403 || response.status === 401) {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
        await AsyncStorage.removeItem("wallet")

        return { "status": "error" }
    }
    return response

  } catch (error) {
    Alert.alert(
      "Error",
      JSON.stringify(error),
      [{ text: 'OK' }]
    )
  }
}

let _apiCallWithoutData = async (url, method) => {
  try {
    let headers = await getHeaders()
    let response = await fetch(url, {
      method,
      headers,
      credentials: 'omit',
    })
    let responseJson = await response.json()
    if (response.status === 403 || response.status === 401) {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
        await AsyncStorage.removeItem("wallet")
    }
    return responseJson
  } catch (error) {
    return { "status": "error" }
  }
}

const baseService = {

  get: (endPoint) => {
    return _apiCallWithoutData(baseUrl + endPoint, "GET")
  },

  getWithFullUrl: (url) => {
    return _apiCallWithoutData(url, "GET")
  },

  post: (endPoint, data) => {
    return _apiCallWithData(baseUrl + endPoint, "POST", data)
  },

  patch: (endPoint, data) => {
    return _apiCallWithData(baseUrl + endPoint, "PATCH", data)
  },

  put: (endPoint, data) => {
    return _apiCallWithData(baseUrl + endPoint, "PUT", data)
  },

  delete: (endPoint) => {
    return _apiCallWithoutData(baseUrl + endPoint, "DELETE", {})
  },
}

export default baseService
