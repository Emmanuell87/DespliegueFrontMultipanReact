import React, { useEffect, useState } from 'react'
import API from 'axios/API'
import ArticuloTable from 'components/Admin/articulos/ArticuloTable'
import CardCrearArticulo from 'components/Admin/articulos/crearArticulo'
import CardEliminarArticulo from 'components/Admin/articulos/eliminarArticulo'
import CardEditarArticulo from 'components/Admin/articulos/editarArticulo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Articulos = () => {

    const [listArticulos, setListArticulos] = useState([])
    const [estadoBuscar, setEstadoBuscar] = useState(false)
    const [filtro, setFiltro] = useState('')

    const [eliminarArticulo, setEliminarArticulo] = useState(false)
    const [crearArticulo, setCrearArticulo] = useState(false)
    const [editarArticulo, setEditarArticulo] = useState(false)
    const [articulo, setArticulo] = useState({})//almacena los datos del articulo a editar o eliminar

    useEffect(() =>{
        API.get('/articulos/list')
        .then(response => {
            setListArticulos(response.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    
    const filtrado = () => {
        return listArticulos.filter(articulo => articulo.nombre.toLowerCase().includes(filtro.toLowerCase()))
    }

    const cambiarEstadoBuscar = () => {
        setEstadoBuscar(!estadoBuscar);
        
        if(estadoBuscar){//if se cancela "buscar" limpiamos el filtro
            setFiltro('')
            filtrado()
        }
    }

    const updateListArticulos = () => {
        API.get('/articulos/list')
        .then(response => {
            setListArticulos(response.data)
        })
        .catch(err => {
            console.error(err)
        })

        setArticulo({})
    }

    const messageToast = (message, type) => {
        if(type === 'success'){
            toast.success(message)
        }else{
            toast.error(message)
        }
    }

    return (
        <div className="flex justify-center min-h-screen">

            {
                eliminarArticulo
                ?   <CardEliminarArticulo
                        articuloEliminar = {articulo}
                        setEliminarArticulo = {setEliminarArticulo}
                        setArticulo = {setArticulo}
                        updateListArticulos = {updateListArticulos}
                        messageToast={messageToast}
                    /> 
                : null 
            }
            {
                editarArticulo
                ?   <CardEditarArticulo
                        articuloEdit = {articulo}
                        setEditarArticulo = {setEditarArticulo}
                        setArticulo = {setArticulo}
                        updateListArticulos = {updateListArticulos}
                        messageToast={messageToast}
                    /> 
                : null 
            }
            {
                crearArticulo
                ?   <CardCrearArticulo
                        setCrearArticulo = {setCrearArticulo}
                        setArticulo = {updateListArticulos}
                        updateListArticulos = {setArticulo}
                        messageToast={messageToast}
                    /> 
                : null 
            }

            <div className="col-span-12">
                <div className="max-w-full min-w-[340px] relative h-20 flex items-end">
                    <div className="flex justify-between w-full">
                        <span className="font-bold flex items-end mb-2">
                            Articulos: {filtrado().length}
                        </span>
                        <div className="flex items-end">
                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                                hidden={!estadoBuscar}
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
                                    placeholder="Filtrar nombre"
                                    value={filtro}
                                    onChange={(e) => {
                                        setFiltro(e.target.value);
                                    }}
                                    hidden={!estadoBuscar}
                                />
                            </div>
                            <button 
                                className="inline-flex items-center justify-center w-10 h-10 mr-2 mb-2 text-indigo-500 transition-colors duration-150 bg-gray-300 rounded-full focus:shadow-outline hover:bg-gray-400"
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
                                onClick={() => setCrearArticulo(true)}
                            >
                                Crear Articulo
                            </button>
                        </div>
                    </div>

                </div>
                <div className="overflow-auto lg:overflow-visible ">
                    <table className="table text-gray-400 border-separate space-y-6 text-sm">
                        <thead className="bg-gray-200 text-gray-500">
                            <tr>
                                <th className="p-3 text-center text-gray-800">Articulo</th>
                                <th className="p-3 text-center text-gray-800">Categoria</th>
                                <th className="p-3 text-center text-gray-800">Cantidad</th>
                                <th className="p-3 text-center text-gray-800">Precio</th>
                                <th className="p-3 text-center text-gray-800">Inventario</th>
                                <th className="p-3 text-center text-gray-800">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-auto">
                             {filtrado().map((articulo) => {
                                return(
                                    <ArticuloTable 
                                        key={articulo._id}
                                        dataArticulo = {articulo}
                                        setEliminarArticulo = {setEliminarArticulo}
                                        setEditarArticulo = {setEditarArticulo}
                                        setArticulo = {setArticulo}
                                    />
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
            />
        </div>
    )
}

export default Articulos
