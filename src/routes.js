import { Home } from './pages/Home'
import { About } from './pages/About'
import { BoardApp } from './pages/BoardApp'
// import { Dashboard } from './pages/Dashboard'
// import { LoginSignUp } from './pages/LoginSignUp'


export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/board',
        // ---> path: '/board/:boardId',
        component: BoardApp,
    },
    // {
    //     path: '/login',
    //     component: LoginSignUp,
    // },
    // {
    //     path: '/signUp',
    //     component: LoginSignUp,
    // },
    // {
    //     path: '/dashboard',
    //     component: Dashboard,
    // },
]