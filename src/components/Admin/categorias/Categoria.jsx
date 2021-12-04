import React from 'react'

const Categoria = ({dataCategoria, setEditarCategoria, setEliminarCategoria, setCategoria}) => {

    const cambiarEstadoEditar = () => {
        setCategoria(dataCategoria)
        setEditarCategoria(true)
    }

    const cambiarEstadoEliminar = () => {
        setCategoria(dataCategoria)
        setEliminarCategoria(true)
    }

    return (
        <div className="max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div className="overflow-x-hidden rounded-2xl ">
                <img className="h-40 rounded-2xl w-full object-cover" src={dataCategoria.imagen.secure_url} alt={dataCategoria.name} />

            </div>
            <div className="mt-4 pl-2 mb-2 ">
                <div className="mb-2">
                    <p className="text-lg font-semibold text-gray-900 mb-0">{dataCategoria.name}</p>
                </div>
                <div className="grid grid-cols-1">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full">
                        Ver Articulos
                    </button>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full"
                        onClick={cambiarEstadoEditar}
                    >
                        Editar Categoria
                    </button>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={cambiarEstadoEliminar}
                    >
                        Eliminar Categoria
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Categoria
