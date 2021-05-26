import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <header className="main-header">


            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/board">Boards</NavLink>
            </nav>
        </header>
    )

}
