import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

import MainHeader from "./MainHeader"
import NavLinks from "./NavLinks"
import SideDrawer from "./SideDrawer"
import Backdrop from "../UIElements/Backdrop"

import './MainNavigation.css'

const MainNavigation = params => {

    const [drawerStateOpened, setDrawerStateOpen] = useState(false)

    function openDrawer() {
        return setDrawerStateOpen(true)
    }

    function closeDrawer() {
        return setDrawerStateOpen(false)
    }

    return (
        <React.Fragment>

            {
                drawerStateOpened && <Backdrop onClick={closeDrawer} />
            }

            <SideDrawer show={drawerStateOpened} onClick={closeDrawer}>
                <nav className="main-navigation-drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button className="main-navigation-menu-btn" onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation-title">
                    <Link to={"/"}>Your places</Link>
                </h1>
                <nav className="main-navigation-header-hav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation