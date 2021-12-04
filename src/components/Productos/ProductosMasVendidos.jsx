import React from 'react'
import {Link} from 'react-router-dom'

const productosMasVendidos = ({imagen, calificacion, nombreProducto, descripcion, precio}) => {
    return (
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink ">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                        <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
                            <img src={imagen} className="h-64 w-full rounded-t pb-6" alt="producto"/>
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6">{calificacion}</p>
                            <div className="w-full font-bold text-xl text-gray-900 px-6">{nombreProducto}</div>
                            <p className="text-gray-800 font-serif text-base px-6 mb-5">
                                {descripcion}. 
                            </p>
                        </Link>
                </div>
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600 text-xs md:text-sm">{precio}</p>
                        </div>
                    </div>
        </div>
    )
}

export default productosMasVendidos
