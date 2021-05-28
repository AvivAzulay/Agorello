import { Home } from './pages/Home'
import { About } from './pages/About'
import { BoardApp } from './pages/BoardApp'


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
]