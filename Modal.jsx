/*
https://stackoverflow.com/questions/53595935/how-can-i-make-react-portal-work-with-react-hook
*/

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const backgroundStyles = {
    position: 'fixed',
    // position: 'absolute',
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'gray',
    backgroundColor: 'rgb(33, 179, 106)',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const modalStyles = {
    position: 'relative',

    // width: '50%',
    // height: '75%',

    maxHeight: '100vh',
    maxWidth: '75%',

    overflow: 'auto',

    backgroundColor: 'white',

    borderRadius: '3px',
    boxShadow: '0 0 10px 2px rgba(33, 33,33, 0.2)',

    padding: '1rem',

    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
}

const Modal = ({ children, modalRoot = '#portal' }) => {
    const [modalElem] = useState(() => {
        const elem = document.createElement('div')
        return elem;
    })

    useEffect(() => {
        document.querySelector(modalRoot).appendChild(modalElem)
        return () => {
            document.querySelector(modalRoot).removeChild(modalElem)
        }
    })

    const modalWrapper = <div style={backgroundStyles}>
        <div style={modalStyles}>
            {children}
        </div>
    </div>

    return ReactDOM.createPortal(modalWrapper, modalElem)
}

export default Modal