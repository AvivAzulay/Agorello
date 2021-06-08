import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header({ board }) {
    // console.log(board);
    return (
        <header className="main-header">
            <nav>
                <div className="main-header-left">
                    <NavLink exact to="/"><button className="more-apps main-nav-btn"></button></NavLink>
                    <NavLink exact to="/"><button className="home main-nav-btn"></button></NavLink>
                    <NavLink className="boards main-nav-btn" to="/boards"><span>Boards</span></NavLink>
                </div>

                <div className="logo"></div>
                <div className="main-header-right">
                    <NavLink to="/about"><button className="create-board main-nav-btn"></button></NavLink>
                    {/* <NavLink to={`/dashboard/${board._id}`}> */}
                    <button className="about main-nav-btn"></button>
                    {/* </NavLink> */}

                    <NavLink to="/about"><button className="notifications main-nav-btn"></button></NavLink>
                    <div className="user-img">G</div>
                </div>
            </nav>

        </header>
    )

}
