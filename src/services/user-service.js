import { httpService } from './http-service'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers
}

const gUsers = [
    {
        "_id": "5f6a2528973d861c5d78c355",
        "fullName": "Matan Crispel",
        "username": "matan",
        "password": "matan",
        "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/matan_plxhso.jpg`
    },
    {
        "_id": "5f6a2532173d861c5d78c332",
        "fullName": "Gad Refaeli",
        "username": "gad",
        "password": "gad",
        "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg`
    },
    {
        "_id": "5f6a2532173d861c5d78c321",
        "fullName": "Aviv Azulay",
        "username": "aviv",
        "password": "aviv",
        "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg`
    },
    {
        "_id": "5f6a2532173d861c5d78c320",
        "fullName": "Oded Alon",
        "username": "oded",
        "password": "oded",
        "imgUrl": `https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/oded_i8t6vj.jpg`
    }
]

function getUsers() {
    return gUsers
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