import React from 'react'
import { Link } from 'react-router-dom'

const Categorias = ({categoriaData}) => {
    return (
        <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <Link to={`/productos/${categoriaData.name}`}>
                <img className="hover:grow hover:shadow-lg w-full" src={categoriaData.imagen.secure_url} alt="producto"/>
                <div className="pt-3 flex items-center justify-between">
                    <p className="">{categoriaData.name}</p>
                </div>
            </Link>
        </div>
    )
}

export default Categorias
