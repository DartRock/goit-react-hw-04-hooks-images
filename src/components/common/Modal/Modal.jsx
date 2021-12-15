import React from 'react'
import { useState, useEffect } from 'react'
import s from './Modal.module.css'

export const Modal = ({onModalClose, image, alt}) => {

   const keydonwHandler = (e) => {
        if (e.code === "Escape") {
            onModalClose()
        }
    }

    const clickHandler = e => {
        if (e.target === e.currentTarget) {
            onModalClose()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keydonwHandler)

        return () => {
            window.removeEventListener('keydown', keydonwHandler)
        }
    }, [])

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', keydonwHandler)
    // }
    
        return (
        <div onClick={clickHandler} className={s.Overlay}>
            <div className={s.Modal}>
                    <img src={image} alt={alt}/>
            </div>
        </div>
    )
}
