import BaseService from './baseService'

var authService = {
    login: (data) => {
        return BaseService.post('authenticate/', data)
    },

    signup: (data) => {
        return BaseService.post('register/', data)
    },

    sendEmailVerification: () => {
        return BaseService.postWithoutBody('verifyEmail/')
    },

    logout: () => {
        return BaseService.postWithoutBody('logout/')
    },

    forgetPassword: (data) => {
        return BaseService.post('resetPassword/', data)
    },

    changePassword: (data) => {
        return BaseService.post('auth/password/change/', data)
    },

    enableMfa: () => {
        return BaseService.postWithoutBody('mfa/enable/')
    },

    verifyMfa: (data) => {
        return BaseService.post('mfa/verify/', data)
    },

    authMfa: (data) => {
        return BaseService.post('mfa/auth/', data)
    },

    deleteMfa: () => {
        return BaseService.postWithoutBody('mfa/disable/')
    },
}

export default authService
