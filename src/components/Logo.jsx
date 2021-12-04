import React from 'react'
import logo from 'assets/img/Logo.jpg'

const Logo = ({height, width}) => {
    return (
        <div className={`h-${height} w-${width} m-5`}>
            <img src= {logo} alt="imagen" />
        </div>
    )
}

export default Logo
