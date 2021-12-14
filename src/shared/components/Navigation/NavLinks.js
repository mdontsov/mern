import React from "react"
import { NavLink } from "react-router-dom"

import './NavLinks.css'

const NavLinks = params => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to={"/"} exact={true}>All users</NavLink>
            </li>
            <li>
                <NavLink to={"/u1/places"}>My places</NavLink>
            </li>
            <li>
                <NavLink to={"/places/new"}>New places</NavLink>
            </li>
            <li>
                <NavLink to={"/auth"}>Authenticate</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks