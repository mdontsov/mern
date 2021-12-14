import React from "react"
import reactDom from "react-dom"

import './SideDrawer.css'

const SideDrawer = params => {

    const content = <aside className="side-drawer">{params.children}</aside>

    return (
        reactDom.createPortal(content, document.getElementById("drawer-hook"))
    )
}

export default SideDrawer