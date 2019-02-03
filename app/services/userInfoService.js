import BaseService from './baseService'

var UserInfoService = {
    getUserDetails: () => {
        return BaseService.get('getUser')
    },
}

export default UserInfoService
