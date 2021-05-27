import { httpService } from './http.service'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}


async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function signup(userInfo) {
    try {
        console.log(userInfo);
        const user = await httpService.post('auth/signup', userInfo)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.clear()
        return await httpService.post('auth/logout')
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}
