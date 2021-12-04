import React, { useEffect, useState } from 'react'
import API from 'axios/API'
import Categoria from 'components/Admin/categorias/Categoria'
import CardCrearCategoria from 'components/Admin/categorias/crearCategoria'
import CardEditarCategoria from 'components/Admin/categorias/editarCategoria'
import CardEliminarCategoria from 'components/Admin/categorias/eliminarCategoria'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoriasCRUD = () => {
    const [listCategorias, setListCategorias] = useState([])
    const [estadoBuscar, setEstadoBuscar] = useState(false)
    const [filtro, setFiltro] = useState('')

    const [eliminarCategoria, setEliminarCategoria] = useState(false)
    const [crearCategoria, setCrearCategoria] = useState(false)
    const [editarCategoria, setEditarCategoria] = useState(false)
    const [categoria, setCategoria] = useState({})//almacena los datos de la categoria a editar o eliminar

    useEffect(() => {
        API.get('/categorias/list')
        .then(response => {
            setListCategorias(response.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const filtrado = () => {
        return listCategorias.filter(categoria => categoria.name.toLowerCase().includes(filtro.toLowerCase()))
    }

    const cambiarEstadoBuscar = () => {
        setEstadoBuscar(!estadoBuscar);
        
        if(estadoBuscar){//if el estado de buscar es false se resetea el filtro
            setFiltro('')
            filtrado()
        }
    }

    const updateListCategorias = () => {
        API.get('/categorias/list')
        .then(response => {
            setListCategorias(response.data)
        })
        .catch(err => {
            console.error(err)
        })

        setCategoria({})
    }

    const messageToast = (message, type) => {
        if(type === 'success'){
            toast.success(message)
        }else{
            toast.error(message)
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {
                eliminarCategoria
                ?   <CardEliminarCategoria
                        categoriaEliminar = {categoria}
                        setEliminarCategoria = {setEliminarCategoria}
                        setCategoria = {setCategoria}
                        updateListCategorias = {updateListCategorias}
                        messageToast={messageToast}
                    /> 
                : null 
            }
            {
                editarCategoria
                ?   <CardEditarCategoria
                        categoriaEdit = {categoria}
                        setEditarCategoria = {setEditarCategoria}
                        setCategoria = {setCategoria}
                        updateListCategorias = {updateListCategorias}
                        messageToast={messageToast}
                    /> 
                : null 
            }
            {
                crearCategoria
                ?   <CardCrearCategoria
                        setCrearCategoria = {setCrearCategoria}
                        setCategoria = {updateListCategorias}
                        updateListCategorias = {setCategoria}
                        messageToast={messageToast}
                    /> 
                : null 
            }




            <div className="max-w-full min-w-[340px]  mx-12 h-20 flex items-end">
                <div className="flex justify-between w-full">
                    <span className="font-bold flex items-end mb-2">
                        Categorias: {filtrado().length}
                    </span>
                    <div className="flex items-end">
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
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full"
                            onClick={() => setCrearCategoria(true)}
                        >
                            Crear Categoria
                        </button>
                    </div>
                </div>

            </div>
            <div className="max-w-full min-w-[340px] bg-gray-200 shadow-md rounded-3xl  mx-12 flex flex-wrap">
                {
                    filtrado().map((categoria) => {
                        return(
                            <Categoria
                                key={categoria._id}
                                dataCategoria={categoria}
                                setEditarCategoria ={ setEditarCategoria}
                                setEliminarCategoria = {setEliminarCategoria}
                                setCategoria = {setCategoria}
                            />
                        )
                    })
                }
            </div>
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
            />
        </div>
    )
}

export default CategoriasCRUD
