import React from "react"

import './MainHeader.css'

const MainHeader = params => {
    return (
        <header className="main-header">
            {params.children}
        </header>
    )
}

export default MainHeader