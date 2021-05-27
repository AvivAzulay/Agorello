import { Home } from './pages/Home'
import { About } from './pages/About'
import { BoardApp } from './pages/BoardApp'
import { CardDetails } from './cmps/CardDetails.jsx'
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
        path: '/board/:cardId?',
        // ---> path: '/board/:boardId',
        component: BoardApp,
    },
    // {
    //     path: '/board/:cardId',
    //     component: BoardApp,
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