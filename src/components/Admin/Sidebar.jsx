import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
const Sidebar = () => {


    const styleLinkActual = [
        "block py-1 lg:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600",
        "fas fa-link pr-0 lg:pr-3 text-pink-500",
        "pb-1 lg:pb-0 text-xs lg:text-base text-white lg:font-bold block lg:inline-block"
    ]
    const styleOtrosLinks = [
        "block py-1 lg:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 lg:border-gray-900 hover:border-pink-500",
        "fas fa-link pr-0 lg:pr-3",
        "pb-1 lg:pb-0 text-xs lg:text-base text-gray-600 lg:text-gray-400 block lg:inline-block"
    ]
    const [styleHome, setStyleHome] = useState(false)
    const [styleProductos, setStyleProductos] = useState(false)
    const [styleArticulos, setStyleArticulos] = useState(false)
    const [styleCategorias, setStyleCategorias] = useState(false)
    const [styleAdministradores, setStyleAdministradores] = useState(false)
    const [styleVentas, setStyleVentas] = useState(false)
    const location = useLocation();
    const [isRoot, setIsRoot] = useState(false)

    useEffect(() => {
        let localToken = localStorage.getItem('token')
        if(localToken){
            let tokenDecode = decode(localToken)
            if(tokenDecode.rol === 'root'){
                setIsRoot(true)
            }

        }
    }, [])
    
    useEffect(() => {
        setStyleHome(false)
        setStyleProductos(false)
        setStyleArticulos(false)
        setStyleCategorias(false)
        setStyleAdministradores(false)
        setStyleVentas(false)
        if('/' === location.pathname.toLowerCase()){
            setStyleHome(true)
        } else if('/productos' === location.pathname.toLowerCase()){
            setStyleProductos(true)
        } else if('/articulos' === location.pathname.toLowerCase()){
            setStyleArticulos(true)
        } else if('/categorias' === location.pathname.toLowerCase()){
            setStyleCategorias(true)
        } else if('/administradores' === location.pathname.toLowerCase()){
            setStyleAdministradores(true)
        } else if('/ventas' === location.pathname.toLowerCase()){
            setStyleVentas(true)
        }
    }, [location, styleHome, styleProductos, styleArticulos, styleCategorias, styleAdministradores, styleVentas])
    return (
        <div className="w-full lg:w-1/5 bg-gray-900 lg:bg-gray-900 px-2 text-center lg:fixed bottom-0 lg:pt-8 lg:top-0 lg:left-0 h-16 lg:h-screen lg:border-r-4 lg:border-gray-600">
            <div className="lg:relative lg:w-4/5 mx-auto lg:float-right lg:px-6" >
                <ul className="list-reset flex flex-row lg:flex-col text-center lg:text-left">

                    <li className="mr-3 flex-1">
                        <Link to="/" className={styleHome? styleLinkActual[0] : styleOtrosLinks[0]}>
                            <i className={styleHome ? styleLinkActual[1] : styleOtrosLinks[1]}></i><span className={styleHome ? styleLinkActual[2] : styleOtrosLinks[2]}>Home</span>
                        </Link>
                    </li>


                    <li className="mr-3 flex-1">
                        <Link to="/productos" className={styleProductos ? styleLinkActual[0] : styleOtrosLinks[0]}>
                            <i className={styleProductos ? styleLinkActual[1] : styleOtrosLinks[1]}></i><span className={styleProductos ? styleLinkActual[2] : styleOtrosLinks[2]}>Productos</span>
                        </Link>
                    </li>

                    <li className="mr-3 flex-1">
                        <Link to="/articulos" className={styleArticulos ? styleLinkActual[0] : styleOtrosLinks[0]}>
                            <i className={styleArticulos ? styleLinkActual[1] : styleOtrosLinks[1]}></i><span className={styleArticulos ? styleLinkActual[2] : styleOtrosLinks[2]}>Articulos</span>
                        </Link>
                    </li>
                    <li className="mr-3 flex-1">
                        <Link to="/categorias-crud" className={styleCategorias ? styleLinkActual[0] : styleOtrosLinks[0]}>
                            <i className={styleCategorias ? styleLinkActual[1] : styleOtrosLinks[1]}></i><span className={styleCategorias ? styleLinkActual[2] : styleOtrosLinks[2]}>Categorias</span>
                        </Link>
                    </li>
                    {
                        isRoot
                        ?
                            <li className="mr-3 flex-1">
                                <Link to="/administradores" className={styleAdministradores ? styleLinkActual[0] : styleOtrosLinks[0]}>
                                    <i className={styleAdministradores ? styleLinkActual[1] : styleOtrosLinks[1]}></i><span className={styleAdministradores ? styleLinkActual[2] : styleOtrosLinks[2]}>Administradores</span>
                                </Link>
                            </li>
                        :
                         null
                    }

                    <li className="mr-3 flex-1">
                        <Link to="/ventas" className={styleVentas ? styleLinkActual[0] : styleOtrosLinks[0]}>
                            <i className={styleVentas ? styleLinkActual[1] : styleOtrosLinks[1]}></i><span className={styleVentas ? styleLinkActual[2] : styleOtrosLinks[2]}>Ventas</span>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}


export default Sidebar
