import { AsyncStorage, Alert } from 'react-native'

import Constants from './../config/constants'
const baseUrl = Constants.rehive_url

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
      return { status: "error" }
    }
    let responseJson = await response.json()
    return responseJson
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
    //console.log(response)
    if (response.status === 403 || response.status === 401) {
      await AsyncStorage.removeItem("token")
      return { status: "error" }
    }
    return responseJson
  } catch (error) {
    Alert.alert(
      "Error",
      JSON.stringify(error),
      [{ text: 'OK' }]
    )
    return { status: "error" }
  }
}

let _apiCallFileUpload = async (url, method, data) => {
  try {
    const token = await AsyncStorage.getItem('token')
    let headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Token ' + token,
    }
    let response = await fetch(url, {
      method,
      headers,
      body: data,
    })
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    Alert.alert(
      "Error",
      JSON.stringify(error),
      [{ text: 'OK' }]
    )
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

  fileUpload: (endPoint, data) => {
    return _apiCallFileUpload(baseUrl + endPoint, "PATCH", data)
  },

  documentUpload: (endPoint, data) => {
    return _apiCallFileUpload(baseUrl + endPoint, "POST", data)
  },
}

export default baseService
