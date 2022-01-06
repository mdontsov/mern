import React from "react"
import reactDom from "react-dom"

import Backdrop from "./Backdrop"
import { CSSTransition } from "react-transition-group"

import './Modal.css'

const ModalOverlay = params => {

    const content = (
        <div className={`modal ${params.className}`} style={params.style}>
            <header className={`modal-header ${params.headerClass}`}>
                <h2>{params.header}</h2>
            </header>
            <form onSubmit={params.onSubmit ? params.onSubmit : (event) => event.preventDefault()}>
                <div className={`modal-content ${params.contentClass}`}>
                    {params.children}
                </div>
                <footer className={`modal-footer ${params.footerClass}`}>
                    {params.footer}
                </footer>
            </form>
        </div>
    )

    return reactDom.createPortal(content, document.getElementById("modal-hook"))
}

const Modal = params => {
    return (
        <React.Fragment>
            {params.show && <Backdrop onClick={params.onCancel} />}
            <CSSTransition
                in={params.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal">
                <ModalOverlay {...params} /> 
            </CSSTransition>
        </React.Fragment>
    )
}

export default Modal