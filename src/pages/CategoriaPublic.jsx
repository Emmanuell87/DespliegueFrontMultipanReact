import API from 'axios/API'
import Categorias from 'components/Productos/Categorias'
import React, { useEffect, useState } from 'react'

const CategoriaPublic = () => {
    const [listCategorias, setListCategorias] = useState()
    const [estadoBuscar, setEstadoBuscar] = useState(false)
    const [filtro, setFiltro] = useState('')

    useEffect(() => {
        API.get('/categorias/list')
        .then((response) =>{
            setListCategorias(response.data)
        })
        .catch((error) =>{
            console.log(error)
        })
    })

    const filtrado = () => {
        return listCategorias.filter(categoria => categoria.name.toLowerCase().includes(filtro.toLowerCase()))
    }

    const cambiarEstadoBuscar = () => {
        setEstadoBuscar(!estadoBuscar)
        if(estadoBuscar){//if el estado de buscar es false se resetea el filtro
            setFiltro('')
            filtrado()
        }
    }

    return (
        
        <div>
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                    <span className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " to="/">
                        Categorias Deliciosas
                    </span>

                    <div className="flex items-center">
                        <div 
                            className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                        >
                            <label 
                                className="text-sm text-gray-500"
                                hidden={!estadoBuscar}
                            >
                                Filtro
                            </label>
                            <input 
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                type="text"
                                name="filtro"
                                placeholder="Filtrar categoria"
                                value={filtro}
                                onChange={(e) => {
                                    setFiltro(e.target.value);
                                }}
                                hidden={!estadoBuscar}
                            />

                        </div>

                        <button 
                            className="inline-flex items-center justify-center w-10 h-10 mr-2 mb-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
                            onClick={cambiarEstadoBuscar}
                        >
                            {
                                estadoBuscar
                                ?   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                :   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                            }

                        </button>
                    </div>
                </div>
                {
                    listCategorias
                    ?
                        filtrado().map((categoria) => {
                            return(
                                <Categorias
                                    key={categoria._id}
                                    categoriaData={categoria}
                                />
                            )
                        })
                    :
                        null
                }

            </div>
        </div>
    )
}

export default CategoriaPublic
