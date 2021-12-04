import React from 'react'
import Footer from 'components/Footer'
import NavbarPublic from 'components/NabvarPublic'

const Publiclayout = ({ children }) => {
    return (
        <div className = "flex-col justify-between h-screen overflow-y-auto">
            <NavbarPublic/>
            <main className = "h-full overflow-y-scroll">{ children }</main>
            <Footer />
        </div>
    )
}

export default Publiclayout
